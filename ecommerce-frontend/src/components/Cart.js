import React from 'react';
import { useEcommerce } from './EcommerceContext';

const Cart = () => {
  const { 
    cart, 
    updateQuantity, 
    getTotalPrice, 
    orderForm, 
    handleFormChange, 
    placeOrder, 
    loading,
    setCurrentPage 
  } = useEcommerce();

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card">
              <div className="card-body py-5">
                <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h3>Your cart is empty</h3>
                <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => setCurrentPage('products')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      
      <div className="row">
        <div className="col-lg-8">
          {cart.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img src={item.image} className="img-fluid rounded" alt={item.name} />
                  </div>
                  <div className="col-md-4">
                    <h5>{item.name}</h5>
                    <p className="text-muted">${item.price}</p>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        min="1"
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-3 text-end">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    <br />
                    <button 
                      className="btn btn-sm btn-outline-danger mt-1"
                      onClick={() => updateQuantity(item.id, 0)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-lg-4">
          <div className="card sticky-top">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Total:</span>
                <strong className="fs-5 text-success">${getTotalPrice()}</strong>
              </div>
              
              <div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={orderForm.firstName}
                    onChange={handleFormChange}
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={orderForm.lastName}
                    onChange={handleFormChange}
                    placeholder="Enter your last name"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address *</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={orderForm.address}
                    onChange={handleFormChange}
                    rows="3"
                    placeholder="Enter your delivery address"
                  ></textarea>
                </div>
                
                <button 
                  className="btn btn-success w-100 mb-3"
                  disabled={loading || cart.length === 0}
                  onClick={placeOrder}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card me-2"></i>
                      Place Order
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => setCurrentPage('products')}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;