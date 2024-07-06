import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '@/redux/cartSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const goodsCart = useSelector(state => state.cart.items);

  const handlerCartToggle = () => {
    dispatch(toggleCart());
  };

  return (
    <header className="header">
      <div className="container header__container">
        <form action="#" className="header__form">
          <input
            type="search"
            className="header__input"
            name="search"
            placeholder="Букет из роз"
            aria-label="Начать поиск"
          />
          <button className="header__search-button">
            <svg width="20" height="20">
              <use href="/img/sprite.svg#arrow" />
            </svg>
          </button>
        </form>
        <img src="/img/logo.svg" alt="Логотип Mirano Flower Boutique" className="header__logo" />
        <button type="button" className="header__cart-button" onClick={handlerCartToggle}>
          {goodsCart.length}
        </button>
      </div>
    </header>
  );
};
