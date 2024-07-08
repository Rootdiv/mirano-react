import './filters.scss';
import { Choices } from '@/modules/Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGoods } from '@/redux/goodsSlice';
import { debounce, getValidFilters } from '@/utils';

export const Filters = () => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  const [filters, setFilters] = useState({
    type: 'bouquets',
    minPrice: '',
    maxPrice: '',
    category: '',
  });

  const prevFiltersRef = useRef(filters);

  const debouncedFetchGoods = useRef(
    debounce(filters => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilters = getValidFilters(filters);
    if (prevFilters.type !== filters.type) {
      dispatch(fetchGoods(validFilters));
    } else {
      debouncedFetchGoods(validFilters);
    }
    prevFiltersRef.current = filters;
  }, [dispatch, debouncedFetchGoods, filters]);

  const handleChoicesToggle = index => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handleTypeChange = ({ target }) => {
    const newFilters = { ...filters, type: target.value, minPrice: '', maxPrice: '' };
    setFilters(newFilters);
  };

  const handlePriceChange = ({ target }) => {
    target.value = target.value.replace(/[^[0-9]/g, '');
    const newFilters = { ...filters, [target.name]: target.value };
    setFilters(newFilters);
  };

  return (
    <section className="filters">
      <h2 className="visually-hidden">Фильтры</h2>
      <div className="container">
        <form className="filters__form">
          <fieldset className="filters__group">
            <input
              type="radio"
              className="filters__radio"
              name="type"
              id="flowers"
              value="bouquets"
              checked={filters.type === 'bouquets'}
              onChange={handleTypeChange}
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
              onChange={handleTypeChange}
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
              onChange={handleTypeChange}
            />
            <label htmlFor="postcards" className="filters__label filters__label_postcards">
              Открытки
            </label>
          </fieldset>
          <fieldset className="filters__group filters__group_choices">
            <Choices buttonLabel="Цена" isOpen={openChoice === 0} onToggle={() => handleChoicesToggle(0)}>
              <fieldset className="filters__price">
                <input
                  type="text"
                  placeholder="от"
                  name="minPrice"
                  className="filters__input-price"
                  value={filters.minPrice}
                  onChange={handlePriceChange}
                />
                <input
                  type="text"
                  placeholder="до"
                  name="maxPrice"
                  className="filters__input-price"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
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
