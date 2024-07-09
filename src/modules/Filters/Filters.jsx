import './filters.scss';
import { Choices } from '@/modules/Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '@/redux/goodsSlice';
import { debounce, getValidFilters } from '@/utils';
import { maxPriceChange, minPriceChange, typeChange } from '@/redux/filtersSlice';

export const Filters = () => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  const filters = useSelector(state => state.filters);
  const search = useSelector(state => state.search.text);

  const prevFiltersRef = useRef(filters);

  const debouncedFetchGoods = useRef(
    debounce(filters => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    if (search !== '') {
      dispatch(typeChange({ type: '', typeName: 'Результат поиска' }));
      debouncedFetchGoods({ search });
      setOpenChoice(null);
      return;
    }

    const prevFilters = prevFiltersRef.current;
    const validFilters = getValidFilters(filters);
    if (prevFilters.type !== filters.type) {
      dispatch(fetchGoods(validFilters));
    } else {
      debouncedFetchGoods(validFilters);
    }
    prevFiltersRef.current = filters;
  }, [dispatch, debouncedFetchGoods, filters, search]);

  const handleChoicesToggle = index => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handlerTypeChange = ({ target }) => {
    const typeName = target.labels[0].textContent;
    dispatch(typeChange({ type: target.value, typeName }));
    setOpenChoice(null);
  };

  const handlerPriceChange = ({ target }) => {
    target.value = target.value.replace(/[^[0-9]/g, '');
    if (target.name === 'minPrice') {
      dispatch(minPriceChange({ [target.name]: target.value }));
    } else {
      dispatch(maxPriceChange({ [target.name]: target.value }));
    }
  };

  return (
    <section className="filters">
      <h2 className="visually-hidden">Фильтры</h2>
      <div className="container">
        <form className="filters__form">
          <fieldset className="filters__group" disabled={search !== ''}>
            <input
              type="radio"
              className="filters__radio"
              name="type"
              id="flowers"
              value="bouquets"
              checked={filters.type === 'bouquets'}
              onChange={handlerTypeChange}
            />
            <label htmlFor="flowers" className="filters__label filters__label_flowers">
              Цветы
            </label>
            <input
              type="radio"
              className="filters__radio"
              name="type"
              id="toys"
              value="toys"
              checked={filters.type === 'toys'}
              onChange={handlerTypeChange}
            />
            <label htmlFor="toys" className="filters__label filters__label_toys">
              Игрушки
            </label>
            <input
              type="radio"
              className="filters__radio"
              name="type"
              id="postcards"
              value="postcards"
              checked={filters.type === 'postcards'}
              onChange={handlerTypeChange}
            />
            <label htmlFor="postcards" className="filters__label filters__label_postcards">
              Открытки
            </label>
          </fieldset>
          <fieldset className="filters__group filters__group_choices" disabled={search !== ''}>
            <Choices buttonLabel="Цена" isOpen={openChoice === 0} onToggle={() => handleChoicesToggle(0)}>
              <fieldset className="filters__price">
                <input
                  type="text"
                  placeholder="от"
                  name="minPrice"
                  className="filters__input-price"
                  value={filters.minPrice}
                  onChange={handlerPriceChange}
                />
                <input
                  type="text"
                  placeholder="до"
                  name="maxPrice"
                  className="filters__input-price"
                  value={filters.maxPrice}
                  onChange={handlerPriceChange}
                />
              </fieldset>
            </Choices>
            <Choices buttonLabel="Тип товара" isOpen={openChoice === 1} onToggle={() => handleChoicesToggle(1)}>
              <ul className="filters__type-list">
                <li className="filters__type-item">
                  <button className="filters__type-button" type="button">
                    Монобукеты
                  </button>
                </li>
                <li className="filters__type-item">
                  <button className="filters__type-button" type="button">
                    Авторские букеты
                  </button>
                </li>
                <li className="filters__type-item">
                  <button className="filters__type-button" type="button">
                    Цветы в коробке
                  </button>
                </li>
                <li className="filters__type-item">
                  <button className="filters__type-button" type="button">
                    Цветы в корзине
                  </button>
                </li>
                <li className="filters__type-item">
                  <button className="filters__type-button" type="button">
                    Букеты из сухоцветов
                  </button>
                </li>
              </ul>
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
