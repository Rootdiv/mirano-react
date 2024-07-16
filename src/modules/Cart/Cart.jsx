import './cart.scss';
import { CartItem } from '@/modules/CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '@/redux/slices/cartSlice';
import { openModal } from '@/redux/slices/orderSlice';
import { useEffect, useRef } from 'react';
import { Preload } from '@/modules/Preload/Preload';

export const Cart = () => {
  const dispatch = useDispatch();
  const { isOpen, status, items, totalPrice } = useSelector(state => state.cart);

  const cartRef = useRef(null);

  const handlerCartClose = () => {
    dispatch(toggleCart());
  };

  const handlerOrderOpen = () => {
    dispatch(openModal());
  };

  useEffect(() => {
    if (isOpen) {
      cartRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <section className="cart cart_open" ref={cartRef}>
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
        {status === 'loading' ? (
          <div className="cart__preload">
            <Preload />
          </div>
        ) : (
          <ul className="cart__list">
            {items.map(item => (
              <CartItem key={item.id} {...item} />
            ))}
          </ul>
        )}
        <div className="cart__footer">
          <button
            type="button"
            className="cart__order-btn"
            onClick={handlerOrderOpen}
            disabled={!items.length}>
            Оформить
          </button>
          <p className="cart__price cart__price_total">{totalPrice}&nbsp;&#8381;</p>
        </div>
      </div>
    </section>
  );
};
