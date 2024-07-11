export const FilterRadio = ({ value, title, type, handlerTypeChange }) => (
  <>
    <input
      type="radio"
      className="filters__radio"
      name="type"
      id={value}
      value={value}
      checked={type === value}
      onChange={handlerTypeChange}
    />
    <label htmlFor={value} className={`filters__label filters__label_${value}`}>
      {title}
    </label>
  </>
);
