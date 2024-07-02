export const CartItem = ({ img, title, price, quantity = 1 }) => (
  <li className="cart__item">
    <img src={img} alt={title} className="cart__image" />
    <h4 className="cart__item-title">{title}</h4>
    <div className="cart__counter">
      <button type="button" className="cart__counter-btn">
        -
      </button>
      <input type="number" className="cart__counter-input" min="0" max="99" defaultValue={quantity} />
      <button type="button" className="cart__counter-btn">
        +
      </button>
    </div>
    <p className="cart__price">{price * quantity}&nbsp;&#8381;</p>
  </li>
);
