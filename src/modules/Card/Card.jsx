import clsx from 'clsx';
import './card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCard } from '@/redux/thunks/cartThunk';
import { toggleCart } from '@/redux/slices/cartSlice';
import { API_URL } from '@/const';
import { useState } from 'react';

export const Card = ({ className, id, photoUrl, name, price }) => {
  const dispatch = useDispatch();
  const isOpenCart = useSelector(state => state.cart.isOpen);

  // коды: \u00A0 - неразрывный пробел и \u20BD - символ рубля
  const [buttonText, setButtonText] = useState(`${price}\u00A0\u20BD`);

  const handlerAddToCard = () => {
    dispatch(addItemToCard({ productId: id }));

    if (!isOpenCart) {
      dispatch(toggleCart());
    }
  };

  const handleMouseEnter = () => {
    setButtonText('в\u00A0корзину');
  };
  const handleMouseLeave = () => {
    setButtonText(`${price}\u00A0\u20BD`);
  };

  return (
    <article className={clsx(className, 'card')}>
      <img src={`${API_URL}${photoUrl}`} alt={name} className="card__image" />
      <div className="card__content">
        <h3 className="card__title">{name}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">сегодня&nbsp;в&nbsp;14:00</p>
          <button
            type="button"
            className="card__button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handlerAddToCard}>
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  );
};
