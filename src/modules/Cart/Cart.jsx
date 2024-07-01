import './cart.scss';

export const Cart = () => (
  <section className="cart">
    <div className="cart__container">
      <div className="cart__header">
        <h3 className="cart__title">Ваш заказ</h3>
        <button type="button" className="cart__close">
          <svg width="28" height="28">
            <use href="/img/sprite.svg#close" />
          </svg>
        </button>
      </div>
      <p className="cart__date-delivery">сегодня&nbsp;в&nbsp;14:00</p>
      <ul className="cart__list"></ul>
      <div className="cart__footer">
        <button type="button" className="cart__order-btn">
          Оформить
        </button>
        <p className="cart__price cart__price_total">0&nbsp;&#8381;</p>
      </div>
    </div>
  </section>
);
