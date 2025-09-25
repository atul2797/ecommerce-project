import React from 'react';
import { useEcommerce } from './EcommerceContext';

const Product = ({ product }) => {
  const { addToCart } = useEcommerce();

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={product.image} 
          className="card-img-top" 
          alt={product.name} 
          style={{height: '200px', objectFit: 'cover'}} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text flex-grow-1 text-muted">{product.description}</p>
          <div className="mt-auto">
            <p className="card-text mb-2">
              <strong className="text-success fs-5">${product.price}</strong>
            </p>
            <button 
              className="btn btn-primary w-100"
              onClick={() => addToCart(product)}
            >
              <i className="fas fa-cart-plus me-2"></i>Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;