import './filters.scss';
import { Choices } from '@/modules/Choices/Choices';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '@/redux/thunks/goodsThunk';
import { debounce, getValidFilters } from '@/utils';
import { typeChange, priceChange, categoryChange } from '@/redux/slices/filtersSlice';
import { FilterRadio } from '@/modules/Filters/FilterRadio';
import clsx from 'clsx';

const filterTypes = [
  { value: 'bouquets', title: 'Цветы' },
  { value: 'toys', title: 'Игрушки' },
  { value: 'postcards', title: 'Открытки' },
];

export const Filters = ({ filterRef }) => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  const filters = useSelector(state => state.filters);
  const categories = useSelector(state => state.goods.categories);

  const prevFiltersRef = useRef(filters);

  const debouncedFetchGoods = useRef(
    debounce(filters => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilters = getValidFilters(filters);
    if (prevFilters.type !== filters.type || prevFilters.search !== filters.search) {
      setOpenChoice(null);
      dispatch(fetchGoods(validFilters));
    } else {
      debouncedFetchGoods(validFilters);
    }
    prevFiltersRef.current = filters;
  }, [dispatch, debouncedFetchGoods, filters]);

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

  const handlerCategoryChange = category => {
    dispatch(categoryChange(category));
    setOpenChoice(null);
  };

  return (
    <section className="filters" ref={filterRef}>
      <h2 className="visually-hidden">Фильтры</h2>
      <div className="container">
        <form className="filters__form">
          <fieldset className="filters__group">
            {filterTypes.map(item => (
              <FilterRadio
                key={item.value}
                {...item}
                type={filters.type}
                handlerTypeChange={handlerTypeChange}
              />
            ))}
          </fieldset>
          <fieldset className="filters__group filters__group_choices">
            <Choices
              buttonLabel="Цена"
              isOpen={openChoice === 0}
              onToggle={() => handleChoicesToggle(0)}>
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
            {filters.type === 'bouquets' || categories.length ? (
              <Choices
                buttonLabel="Тип товара"
                isOpen={openChoice === 1}
                onToggle={() => handleChoicesToggle(1)}>
                <ul className="filters__type-list">
                  <li className="filters__type-item">
                    <button
                      className="filters__type-button"
                      type="button"
                      onClick={() => handlerCategoryChange('')}>
                      Все типы
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category} className="filters__type-item">
                      <button
                        className={clsx('filters__type-button', {
                          'filters__type-button_active': category === filters.category,
                        })}
                        type="button"
                        onClick={() => handlerCategoryChange(category)}>
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </Choices>
            ) : null}
          </fieldset>
        </form>
      </div>
    </section>
  );
};
