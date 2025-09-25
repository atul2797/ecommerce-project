const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory product data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    description: 'Portable bluetooth speaker with excellent sound quality',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand for better posture',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI and power delivery',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    description: 'Precision wireless mouse with long battery life',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop'
  }
];

// API Routes

// GET /api/products - Fetch all products
app.get('/api/products', (req, res) => {
  try {
    console.log('Fetching products...');
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /api/orders - Place an order
app.post('/api/orders', (req, res) => {
  try {
    const { firstName, lastName, address, items, total } = req.body;

    // Validation
    if (!firstName || !firstName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'First name is required'
      });
    }

    if (!lastName || !lastName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Last name is required'
      });
    }

    if (!address || !address.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Address is required'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    // Create order object
    const order = {
      id: Date.now(), // Simple ID generation
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      items,
      total: parseFloat(total),
      status: 'confirmed',
      orderDate: new Date().toISOString()
    };

    // Simulate order processing
    console.log('New Order Received:');
    console.log('======================');
    console.log(`Order ID: ${order.id}`);
    console.log(`Customer: ${order.firstName} ${order.lastName}`);
    console.log(`Address: ${order.address}`);
    console.log(`Order Date: ${new Date(order.orderDate).toLocaleString()}`);
    console.log('\nItems:');
    order.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - Qty: ${item.quantity} - Price: $${item.price} - Subtotal: $${(item.price * item.quantity).toFixed(2)}`);
    });
    console.log(`\nTotal Amount: $${order.total}`);
    console.log('======================\n');

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order.id,
        status: order.status
      }
    });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`E-commerce API server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`GET  http://localhost:${PORT}/api/products`);
  console.log(`POST http://localhost:${PORT}/api/orders`);
  console.log('\nReady to serve requests!\n');
});

module.exports = app;