import React, { useState, useEffect, createContext, useContext } from 'react';

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-warning';

  return (
    <div className={`toast show position-fixed top-0 end-0 m-3 ${bgClass} text-white`} style={{ zIndex: 9999 }}>
      <div className="toast-body d-flex justify-content-between align-items-center">
        <span>{message}</span>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

// Context for global state management
const EcommerceContext = createContext();

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within EcommerceProvider');
  }
  return context;
};

// Context Provider
export const EcommerceProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('products');
  const [orderForm, setOrderForm] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const API_BASE = 'http://localhost:3001/api';

  const showToast = (message, type = 'info') => {
    const id = Date.now() +  Math.random();;
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products`);
      if (response.ok) {
        const result = await response.json();
        setProducts(result.data || []);
        showToast('Products loaded successfully!', 'success');
      } else {
        setProducts([]);
        showToast('No products are available!', 'warning');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Failed to load products', 'error');
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        showToast(`Updated ${product.name} quantity in cart`, 'success');
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`${product.name} added to cart!`, 'success');
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      const item = cart.find(item => item.id === id);
      if (item) {
        showToast(`${item.name} removed from cart`, 'info');
      }
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleFormChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = async () => {
    // Validate required fields
    if (!orderForm.firstName.trim() || !orderForm.lastName.trim() || !orderForm.address.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        firstName: orderForm.firstName,
        lastName: orderForm.lastName,
        address: orderForm.address,
        items: cart,
        total: getTotalPrice()
      };

      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order placed:', result);
        showToast('Order placed successfully! Thank you for your purchase.', 'success');
        setCart([]);
        setOrderForm({ firstName: '', lastName: '', address: '' });
      } else {
        const error = await response.json();
        showToast(error.message || 'Failed to place order', 'error');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      showToast('Network error. Please check if the server is running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    cart,
    currentPage,
    setCurrentPage,
    orderForm,
    handleFormChange,
    loading,
    addToCart,
    updateQuantity,
    getTotalPrice,
    placeOrder,
    showToast
  };

  return (
    <EcommerceContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </EcommerceContext.Provider>
  );
};