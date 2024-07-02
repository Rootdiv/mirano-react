import './order.scss';

export const OrderSuccess = ({ id }) => (
  <div className="order">
    <div className="order__wrapper">
      <h2 className="order__title">Заказ оформлен</h2>
      <p className="order__id">Ваш номер заказа: {id}</p>
    </div>
    <button type="button" className="order__close">
      &times;
    </button>
  </div>
);
