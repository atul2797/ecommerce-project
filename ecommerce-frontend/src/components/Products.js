import React from 'react';
import { useEcommerce } from './EcommerceContext';
import Product from './Product';

const Products = () => {
  const { products } = useEcommerce();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Our Products</h2>
        <span className="badge bg-secondary">{products.length} items</span>
      </div>
      <div className="row">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;