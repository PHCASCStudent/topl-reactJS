import { useCart } from '../context/useCart.js';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return <div className="cart">Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div className="item-details">
            <h4>{item.title}</h4>
            <p>${item.price}</p>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <strong>Total: ${getTotalPrice()}</strong>
      </div>
    </div>
  );
};

export default Cart;