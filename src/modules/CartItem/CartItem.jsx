import { useDispatch } from 'react-redux';
import './cartItem.scss';
import { API_URL } from '@/const';
import { useState } from 'react';
import { addItemToCard } from '@/redux/cartSlice';
import { debounce } from '@/utils';

export const CartItem = ({ id, photoUrl, name, price, quantity }) => {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);

  const debouncedInputChange = debounce(newQuantity => {
    dispatch(addItemToCard({ productId: id, quantity: newQuantity }));
  }, 300);

  const handlerInputChange = ({ target }) => {
    const newQuantity = parseInt(target.value);
    debouncedInputChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = inputQuantity - 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCard({ productId: id, quantity: newQuantity }));
  };
  const handleIncrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCard({ productId: id, quantity: newQuantity }));
  };

  return (
    <li className="cart__item">
      <img src={`${API_URL}${photoUrl}`} alt={name} className="cart__image" />
      <h4 className="cart__item-title">{name}</h4>
      <div className="cart__counter">
        <button type="button" className="cart__counter-btn" onClick={handleDecrement}>
          -
        </button>
        <input
          type="number"
          className="cart__counter-input"
          min="0"
          max="99"
          value={inputQuantity}
          onChange={handlerInputChange}
        />
        <button type="button" className="cart__counter-btn" onClick={handleIncrement}>
          +
        </button>
      </div>
      <p className="cart__price">{price * inputQuantity}&nbsp;&#8381;</p>
    </li>
  );
};
