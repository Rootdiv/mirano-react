import './subscription.scss';

export const Subscription = () => (
  <section className="subscription">
    <div className="container">
      <h2 className="subscription__title">Подпишись на&nbsp;рассылку</h2>
      <form action="#" className="subscription__form">
        <input type="email" className="subscription__input" name="email" placeholder="E-mail" />
        <button className="subscription__button" aria-label="Подписаться на рассылку">
          <svg width="20" height="20" className="subscription__arrow">
            <use href="/img/sprite.svg#arrow" />
          </svg>
        </button>
      </form>
    </div>
  </section>
);
