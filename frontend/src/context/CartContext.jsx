import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null); // { message, type }

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, toast }}>
      {children}
      {/* Global Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 9999,
          background: toast.type === 'error' ? '#dc2626' : '#1a1a2e',
          color: '#fff',
          padding: '14px 24px',
          borderRadius: '12px',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          fontSize: '0.92rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideInToast 0.35s cubic-bezier(0.23,1,0.32,1)',
          maxWidth: '340px',
        }}>
          <span style={{ fontSize: '1.1rem' }}>{toast.type === 'error' ? '❌' : '🛒'}</span>
          {toast.message}
        </div>
      )}
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
