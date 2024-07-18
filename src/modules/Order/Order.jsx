import './order.scss';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearOrder, closeModal, updateOrderData } from '@/redux/slices/orderSlice';
import { sendOrder } from '@/redux/thunks/orderThunk';

export const Order = () => {
  const dispatch = useDispatch();
  const selectWrapper = useRef(null);
  const { isOpen, orderId, data } = useSelector(state => state.order);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const handlerClose = useCallback(
    event => {
      const target = event.target;
      if (target.closest('.order__close') || target.matches('.order') || event.key === 'Escape') {
        dispatch(closeModal());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const handlerEsc = event => {
      handlerClose(event);
    };

    if (orderId) {
      dispatch(clearOrder());
    }

    if (isOpen) {
      document.addEventListener('keydown', handlerEsc);
    }

    return () => {
      document.removeEventListener('keydown', handlerEsc);
    };
  }, [isOpen, handlerClose, orderId, dispatch]);

  if (!isOpen) return null;

  const currentMinDate = new Date().toISOString().split('T')[0];

  const openSelect = () => {
    selectWrapper.current.classList.add('order__select-wrapper_active');
  };

  const closeSelect = () => {
    selectWrapper.current.classList.remove('order__select-wrapper_active');
  };

  const handlerChange = ({ target }) => {
    let selectDate = new Date(data.deliveryDate);
    let selectTimeMin = '';
    let selectTimeMax = '';
    const hour = new Date().getHours();
    const minDate = new Date(currentMinDate);

    if (target.name === 'deliveryDate') {
      selectDate = new Date(target.value);
    }
    if (target.name === 'deliveryTime') {
      [selectTimeMin, selectTimeMax] = target.value.split('-');
    }

    if (target.value.trim() === '') {
      target.style.borderColor = '#ff0000';
    } else if (selectDate.getTime() < minDate.getTime()) {
      target.style.borderColor = '#ff0000';
    } else if (
      // Проверяем, что выбранное дата и время в диапазоне текущего времени и даты
      selectDate.getTime() <= minDate.getTime() &&
      hour > parseInt(selectTimeMin) &&
      hour >= parseInt(selectTimeMax)
    ) {
      target.style.borderColor = '#ff0000';
    } else {
      target.removeAttribute('style');
    }
    dispatch(updateOrderData({ [target.name]: target.value }));
  };

  const handlerSubmit = event => {
    event.preventDefault();
    const formElem = event.target;
    if (
      !Object.values(data).includes('') ||
      !formElem.deliveryDate.getAttribute('style') ||
      !formElem.deliveryTime.getAttribute('style')
    ) {
      dispatch(sendOrder());
    }
  };

  return (
    <div className="order" onClick={handlerClose}>
      <div className="order__wrapper">
        {orderId ? (
          <div className="order__wrapper">
            <h2 className="order__title">Заказ оформлен</h2>
            <p className="order__id">Ваш номер заказа: {orderId}</p>
          </div>
        ) : (
          <>
            <h2 className="order__title">Оформить заказ</h2>
            <form className="order__form" id="order" onSubmit={handlerSubmit}>
              <fieldset className="order__fieldset">
                <legend className="order__legend">Данные заказчика</legend>
                <div className="order__input-group">
                  <input
                    type="text"
                    className="order__input"
                    name="bayerName"
                    placeholder="Имя"
                    value={data.bayerName}
                    onChange={handlerChange}
                    required
                  />
                  <input
                    type="tel"
                    className="order__input"
                    name="bayerPhone"
                    placeholder="Телефон"
                    value={data.bayerPhone}
                    onChange={handlerChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="order__fieldset">
                <legend className="order__legend">Данные получателя</legend>
                <div className="order__input-group">
                  <input
                    type="text"
                    className="order__input"
                    name="recipientName"
                    placeholder="Имя"
                    value={data.recipientName}
                    onChange={handlerChange}
                    required
                  />
                  <input
                    type="tel"
                    className="order__input"
                    name="recipientPhone"
                    placeholder="Телефон"
                    value={data.recipientPhone}
                    onChange={handlerChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="order__fieldset">
                <legend className="order__legend">Адрес</legend>
                <div className="order__input-group">
                  <input
                    type="text"
                    className="order__input order__input"
                    name="street"
                    placeholder="Улица"
                    value={data.street}
                    onChange={handlerChange}
                    required
                  />
                  <input
                    type="text"
                    className="order__input order__input_min"
                    name="house"
                    placeholder="Дом"
                    value={data.house}
                    onChange={handlerChange}
                    required
                  />
                  <input
                    type="text"
                    className="order__input order__input_min"
                    name="flat"
                    placeholder="Квартира"
                    value={data.flat}
                    onChange={handlerChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="order__fieldset">
                <div className="order__payment">
                  <label className="order__label-radio">
                    <input
                      type="radio"
                      className="order__radio"
                      name="paymentOnline"
                      value={data.paymentOnline}
                      onChange={handlerChange}
                      defaultChecked
                    />
                    Оплата онлайн
                  </label>
                </div>
                <div className="order__delivery">
                  <label className="order__label" htmlFor="delivery">
                    Дата доставки
                  </label>
                  <input
                    type="date"
                    className="order__input order__input_date"
                    name="deliveryDate"
                    onChange={handlerChange}
                    value={data.deliveryDate}
                    min={currentMinDate}
                    required
                  />
                  <div className="order__select-wrapper" ref={selectWrapper}>
                    <select
                      id="delivery"
                      className="order__select"
                      name="deliveryTime"
                      onFocus={openSelect}
                      value={data.deliveryTime}
                      onBlur={closeSelect}
                      onChange={handlerChange}
                      required>
                      <option value="">Выберете время</option>
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
              <p className="order__price">{totalPrice}&nbsp;&#8381;</p>
              <button
                type="submit"
                form="order"
                className="order__button"
                disabled={Object.values(data).includes('')}>
                Заказать
              </button>
            </div>
          </>
        )}
        <button type="button" className="order__close">
          &times;
        </button>
      </div>
    </div>
  );
};
