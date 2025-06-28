import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;