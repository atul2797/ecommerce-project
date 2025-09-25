import React from 'react';
import { EcommerceProvider, useEcommerce } from './components/EcommerceContext';
import MenuBar from './components/MenuBar';
import Products from './components/Products';
import Cart from './components/Cart';

// Main Content Component
const MainContent = () => {
  const { currentPage } = useEcommerce();
  
  return currentPage === 'products' ? <Products /> : <Cart />;
};

// Main App Component
const App = () => {
  return (
    <EcommerceProvider>
      <div className="App">
        {/* Bootstrap CSS and Font Awesome */}
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css" 
          rel="stylesheet" 
        />
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          rel="stylesheet" 
        />
        
        <MenuBar />
        <MainContent />
      </div>
    </EcommerceProvider>
  );
};

export default App;