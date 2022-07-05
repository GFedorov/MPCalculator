import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [goodsSubTot, setGoodsSubTot] = useState(0);
  const [showCart, setShowCart] = useState(false);  

  const value = {
    setGoodsSubTot,
    goodsSubTot,
    showCart,
    setShowCart,
  };
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);