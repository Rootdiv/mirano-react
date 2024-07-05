import clsx from 'clsx';
import './card.scss';
import { useDispatch } from 'react-redux';
import { addItemToCard } from '@/redux/cartSlice';
import { API_URL } from '@/const';

export const Card = ({ className, id, photoUrl, name, price }) => {
  const dispatch = useDispatch();

  const handlerAddToCard = () => {
    dispatch(addItemToCard({ id, photoUrl, name, price }));
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
            onMouseEnter={({ target }) => {
              target.innerHTML = 'в&nbsp;корзину';
            }}
            onMouseLeave={({ target }) => {
              target.innerHTML = `${price}&nbsp;&#8381`;
            }}
            onClick={handlerAddToCard}>
            {price}&nbsp;&#8381;
          </button>
        </div>
      </div>
    </article>
  );
};
