import './filters.scss';
import { Choices } from '@/modules/Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '@/redux/goodsSlice';
import { debounce, getValidFilters } from '@/utils';
import { typeChange, priceChange } from '@/redux/filtersSlice';
import { FilterRadio } from '@/modules/Filters/FilterRadio';

const filterTypes = [
  { value: 'bouquets', title: 'Цветы' },
  { value: 'toys', title: 'Игрушки' },
  { value: 'postcards', title: 'Открытки' },
];

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
      dispatch(fetchGoods({ search }));
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
    dispatch(priceChange({ name: target.name, value: target.value }));
  };

  return (
    <section className="filters">
      <h2 className="visually-hidden">Фильтры</h2>
      <div className="container">
        <form className="filters__form">
          <fieldset className="filters__group" disabled={search !== ''}>
            {filterTypes.map(item => (
              <FilterRadio key={item.value} {...item} type={filters.type} handlerTypeChange={handlerTypeChange} />
            ))}
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
