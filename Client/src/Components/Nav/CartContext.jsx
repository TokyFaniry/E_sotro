import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If the item already exists in the cart, increase its quantity
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      // If it's a new item, add it with a quantity of 1
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Function to calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2); // Adjusted for quantity
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantity
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
