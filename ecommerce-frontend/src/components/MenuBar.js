import React from 'react';
import { useEcommerce } from './EcommerceContext';

const MenuBar = () => {
  const { currentPage, setCurrentPage, cart } = useEcommerce();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <button 
          className="navbar-brand btn btn-link text-white text-decoration-none p-0"
          onClick={() => setCurrentPage('products')}
        >
          E-Commerce Store
        </button>
        <div className="navbar-nav ms-auto">
          <button 
            className={`btn me-2 ${currentPage === 'products' ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setCurrentPage('products')}
          >
            Products
          </button>
          <button 
            className={`btn position-relative ${currentPage === 'cart' ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setCurrentPage('cart')}
          >
            Cart
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;