import './filters.scss';
import { Choices } from '@/modules/Choices/Choices';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGoods } from '@/redux/goodsSlice';

export const Filters = () => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  const handleChoicesToggle = index => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const applyFilters = ({ target }) => {
    if (target.name === 'type') {
      dispatch(fetchGoods({ type: target.value }));
    }
  };

  return (
    <section className="filters">
      <h2 className="visually-hidden">Фильтры</h2>
      <div className="container">
        <form className="filters__form" onInput={applyFilters}>
          <fieldset className="filters__group">
            <input type="radio" className="filters__radio" name="type" id="flowers" value="bouquets" defaultChecked />
            <label htmlFor="flowers" className="filters__label filters__label_flowers">
              Цветы
            </label>
            <input type="radio" className="filters__radio" name="type" id="toys" value="toys" />
            <label htmlFor="toys" className="filters__label filters__label_toys">
              Игрушки
            </label>
            <input type="radio" className="filters__radio" name="type" id="postcards" value="postcards" />
            <label htmlFor="postcards" className="filters__label filters__label_postcards">
              Открытки
            </label>
          </fieldset>
          <fieldset className="filters__group filters__group_choices">
            <Choices buttonLabel="Цена" isOpen={openChoice === 0} onToggle={() => handleChoicesToggle(0)}>
              <fieldset className="filters__price">
                <input type="text" placeholder="от" name="minPrice" className="filters__input-price" />
                <input type="text" placeholder="до" name="maxPrice" className="filters__input-price" />
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
