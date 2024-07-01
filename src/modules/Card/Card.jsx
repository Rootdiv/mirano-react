import clsx from 'clsx';
import './card.scss';

export const Card = ({ className, img, title, price }) => (
  <article className={clsx(className, 'card')}>
    <img src={img} alt={title} className="card__image" />
    <div className="card__content">
      <h3 className="card__title">{title}</h3>
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
          }}>
          {price}&nbsp;&#8381;
        </button>
      </div>
    </div>
  </article>
);
