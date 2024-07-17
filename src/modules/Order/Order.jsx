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

  const handlerDeliveryDate = ({ target }) => {
    const minDate = new Date(currentMinDate);
    const selectDate = new Date(target.value);

    if (selectDate.getTime() < minDate.getTime()) {
      target.style.borderColor = '#ff0000';
    } else {
      target.removeAttribute('style');
      dispatch(updateOrderData({ deliveryDate: target.value }));
    }
  };

  const handlerDeliveryTime = ({ target }) => {
    const minDate = new Date(currentMinDate);
    const deliveryDate = new Date(data.deliveryDate);
    const hour = new Date().getHours();
    const [selectTimeMin, selectTimeMax] = target.value.split('-');

    if (
      deliveryDate.getTime() <= minDate.getTime() &&
      hour > parseInt(selectTimeMin) &&
      hour >= parseInt(selectTimeMax)
    ) {
      target.style.borderColor = '#ff0000';
    } else {
      target.removeAttribute('style');
    }
  };

  const handlerSubmit = event => {
    event.preventDefault();
    const formElem = event.target;
    const formData = new FormData(formElem);
    const formObject = Object.fromEntries(formData);
    if (
      !formElem.deliveryDate.getAttribute('style') ||
      !formElem.deliveryTime.getAttribute('style')
    ) {
      dispatch(updateOrderData(formObject));
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
                    defaultValue={data.bayerName}
                    placeholder="Имя"
                    required
                  />
                  <input
                    type="tel"
                    className="order__input"
                    name="bayerPhone"
                    defaultValue={data.bayerPhone}
                    placeholder="Телефон"
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
                    defaultValue={data.recipientName}
                    placeholder="Имя"
                    required
                  />
                  <input
                    type="tel"
                    className="order__input"
                    name="recipientPhone"
                    defaultValue={data.recipientPhone}
                    placeholder="Телефон"
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
                    defaultValue={data.street}
                    placeholder="Улица"
                    required
                  />
                  <input
                    type="text"
                    className="order__input order__input_min"
                    name="house"
                    defaultValue={data.house}
                    placeholder="Дом"
                    required
                  />
                  <input
                    type="text"
                    className="order__input order__input_min"
                    name="flat"
                    defaultValue={data.flat}
                    placeholder="Квартира"
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
                      defaultValue={data.paymentOnline}
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
                    defaultValue={data.deliveryDate}
                    onChange={handlerDeliveryDate}
                    min={currentMinDate}
                    required
                  />
                  <div className="order__select-wrapper" ref={selectWrapper}>
                    <select
                      id="delivery"
                      name="deliveryTime"
                      defaultValue={data.deliveryTime}
                      className="order__select"
                      onFocus={openSelect}
                      onBlur={closeSelect}
                      onChange={handlerDeliveryTime}
                      required>
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
              <button type="submit" form="order" className="order__button">
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
