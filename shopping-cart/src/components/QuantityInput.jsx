import PropTypes from 'prop-types';

const QuantityInput = ({ value, onChange, min = 1, max = 99 }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="quantity-input">
      <button onClick={handleDecrement} disabled={value <= min}>-</button>
      <input 
        type="number" 
        value={value} 
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <button onClick={handleIncrement} disabled={value >= max}>+</button>
    </div>
  );
};

QuantityInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default QuantityInput;