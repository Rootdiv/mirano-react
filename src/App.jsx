import { Header } from '@/modules/Header/Header';
import { Footer } from '@/modules/Footer/Footer';
import { Goods } from '@/modules/Goods/Goods';

/* eslint-disable max-len */
export const App = () => (
  <>
    <Header />
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero__head-group">
            <h1 className="hero__title">Авторские букеты</h1>
            <p className="hero__subtitle">и подарки</p>
          </div>
          <figure className="hero__group-image">
            <picture className="hero__image hero__image_left">
              <source srcSet="/img/hero-left@1x.avif 1x, /img/hero-left@2x.avif 2x" type="image/avif" />
              <source srcSet="/img/hero-left@1x.webp 1x, /img/hero-left@2x.webp 2x" type="image/webp" />
              <img
                src="/img/hero-left@1x.jpg"
                srcSet="/img/hero-left@2x.jpg 2x"
                alt="Букет цветов в банке. В банке ярко-оранжевые розы, ярко-оранжевые тюльпаны и львиный зев. Дополнительно в композицию включены белые цветы и зелёные элементы, придающие букету объём и разнообразие."
              />
            </picture>
            <svg
              role="img"
              className="hero__image hero__image_center"
              aria-label="Букет цветов в вазе, включающие нежные розовые розы, розовые хризантемы и другие цветы пастельных цветов, в форме головы."
              width="680"
              height="588"
              viewBox="0 0 680 588"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice">
              <clipPath id="hero">
                <path d="M680 112.187c0 25.767-26.432 49.501-70.854 68.423C653.568 211.682 680 250.658 680 292.973c0 42.896-27.164 82.362-72.696 113.64C652.836 425.66 680 449.692 680 475.813c0 61.836-152.223 111.963-340 111.963S0 537.649 0 475.813c0-26.121 27.164-50.153 72.696-69.2C27.164 375.335 0 335.869 0 292.973c0-42.315 26.432-81.291 70.854-112.363C26.432 161.688 0 137.954 0 112.187 0 50.352 152.223.224 340 .224s340 50.128 340 111.963Z" />
              </clipPath>
              <foreignObject width="100%" height="100%" clipPath="url(#hero)">
                <picture>
                  <source srcSet="/img/hero@1x.avif 1x, /img/hero@2x.avif 2x" type="image/avif" />
                  <source srcSet="/img/hero@1x.webp 1x, /img/hero@2x.webp 2x" type="image/webp" />
                  <img src="/img/hero@1x.jpg" srcSet="/img/hero@2x.jpg 2x" />
                </picture>
              </foreignObject>
            </svg>
            <picture className=" hero__image hero__image_right">
              <source srcSet="/img/hero-right@1x.avif 1x, /img/hero-right@2x.avif 2x" type="image/avif" />
              <source srcSet="/img/hero-right@1x.webp 1x, /img/hero-right@2x.webp 2x" type="image/webp" />
              <img
                src="/img/hero-right@1x.jpg"
                srcSet="/img/hero-right@2x.jpg 2x"
                alt="Букет из красных, белых и розовых цветов в вазе."
              />
            </picture>
          </figure>
        </div>
      </section>
      <section className="filters">
        <h2 className="visually-hidden">Фильтры</h2>
        <div className="container">
          <form className="filters__form">
            <fieldset className="filters__group">
              <input type="radio" className="filters__radio" name="type" id="flowers" value="bouquets" defaultChecked />
              <label htmlFor="flowers" className="filters__label filters__label_flowers">
                Цветы
              </label>
              <input type="radio" className="filters__radio" name="type" id="toys" value="toys" />
              <label htmlFor="toys" className="filters__label filters__label_toys">
                Игрушки
              </label>
              <input type="radio" className="filters__radio" name="type" id="postcards" value="postcards" />
              <label htmlFor="postcards" className="filters__label filters__label_postcards">
                Открытки
              </label>
            </fieldset>
            <fieldset className="filters__group filters__group_choices">
              <div className="filters__choices choices">
                <button type="button" className="filters__select choices__btn">
                  Цена
                </button>
                <div className="filters__choices-box choices__box">
                  <fieldset className="filters__price">
                    <input type="text" placeholder="от" name="minPrice" className="filters__input-price" />
                    <input type="text" placeholder="до" name="maxPrice" className="filters__input-price" />
                  </fieldset>
                </div>
              </div>
              <div className="filters__choices filters__choices_type choices">
                <button type="button" className="filters__select choices__btn">
                  Тип товара
                </button>
                <div className="filters__choices-box filters__choices-box_type choices__box"></div>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
      <Goods />
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
    </main>
    <Footer />
  </>
);
