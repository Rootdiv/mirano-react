import './cart.scss';
import { goodsArray } from '@/goodsArray';
import { CartItem } from '@/modules/Cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '@/redux/cartSlice';
import { openOrder } from '@/redux/modalSlice';

export const Cart = () => {
  const isOpen = useSelector(state => state.cart.isOpen);
  const dispatch = useDispatch();

  const handlerCartClose = () => {
    dispatch(toggleCart());
  };

  const handlerOrder = () => {
    dispatch(openOrder());
  };

  if (!isOpen) return null;

  return (
    <section className="cart cart_open">
      <div className="cart__container">
        <div className="cart__header">
          <h3 className="cart__title">Ваш заказ</h3>
          <button type="button" className="cart__close" onClick={handlerCartClose}>
            <svg width="28" height="28">
              <use href="/img/sprite.svg#close" />
            </svg>
          </button>
        </div>
        <p className="cart__date-delivery">сегодня&nbsp;в&nbsp;14:00</p>
        <ul className="cart__list">
          {goodsArray.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
        </ul>
        <div className="cart__footer">
          <button type="button" className="cart__order-btn" onClick={handlerOrder}>
            Оформить
          </button>
          <p className="cart__price cart__price_total">0&nbsp;&#8381;</p>
        </div>
      </div>
    </section>
  );
};
