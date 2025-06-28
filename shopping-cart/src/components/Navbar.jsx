// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.js';

const Navbar = () => {
  const { getTotalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Shopping Cart</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <div className="cart-info">
          Cart ({getTotalItems()})
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;