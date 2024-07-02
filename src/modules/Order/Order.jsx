import { useRef } from 'react';
import './order.scss';

export const Order = ({ totalPriceValue }) => {
  const selectWrapper = useRef(null);

  const openSelect = () => {
    selectWrapper.current.classList.add('order__select-wrapper_active');
  };

  const closeSelect = () => {
    selectWrapper.current.classList.remove('order__select-wrapper_active');
  };

  const date = new Date();
  date.setDate(date.getDate() + 1);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const deliveryDate = `${day}.${month}`;

  return (
    <div className="order">
      <div className="order__wrapper">
        <h2 className="order__title">Оформить заказ</h2>
        <form className="order__form" id="order">
          <fieldset className="order__fieldset">
            <legend className="order__legend">Данные заказчика</legend>
            <div className="order__input-group">
              <input type="text" className="order__input" name="name-bayer" placeholder="Имя" />
              <input type="tel" className="order__input" name="phone-bayer" placeholder="Телефон" />
            </div>
          </fieldset>
          <fieldset className="order__fieldset">
            <legend className="order__legend">Данные получателя</legend>
            <div className="order__input-group">
              <input type="text" className="order__input" name="name-recipient" placeholder="Имя" />
              <input type="tel" className="order__input" name="phone-recipient" placeholder="Телефон" />
            </div>
          </fieldset>
          <fieldset className="order__fieldset">
            <legend className="order__legend">Адрес</legend>
            <div className="order__input-group">
              <input type="text" className="order__input order__input" name="street" placeholder="Улица" />
              <input type="text" className="order__input order__input_min" name="house" placeholder="Дом" />
              <input type="text" className="order__input order__input_min" name="flat" placeholder="Квартира" />
            </div>
          </fieldset>
          <fieldset className="order__fieldset">
            <div className="order__payment">
              <label className="order__label-radio">
                <input type="radio" className="order__radio" name="payment-online" defaultChecked />
                Оплата онлайн
              </label>
            </div>
            <div className="order__delivery">
              <label className="order__label" htmlFor="delivery">
                Доставка {deliveryDate}
              </label>
              <input type="hidden" name="delivery-date" value={deliveryDate} />
              <div className="order__select-wrapper" ref={selectWrapper}>
                <select
                  id="delivery"
                  name="delivery-time"
                  className="order__select"
                  onFocus={openSelect}
                  onBlur={closeSelect}>
                  <option value="9-12">с 9:00 до 12:00</option>
                  <option value="12-15">с 12:00 до 15:00</option>
                  <option value="15-18">с 15:00 до 18:00</option>
                  <option value="18-21">с 18:00 до 21:00</option>
                </select>
              </div>
            </div>
          </fieldset>
        </form>
        <div className="order__footer">
          <p className="order__price">{totalPriceValue}&nbsp;&#8381;</p>
          <button type="submit" form="order" className="order__button">
            Заказать
          </button>
        </div>
        <button type="button" className="order__close">
          &times;
        </button>
      </div>
    </div>
  );
};
