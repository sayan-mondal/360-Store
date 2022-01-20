import React from "react";

const StoreContext = React.createContext({
  cartItems: [],
  cartTotalAmount: 0,
  orderItems: [],
  orderTotalAmount: 0,
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  clearCart: () => {},
  addItemsToOrder: (items, totalAmount) => {},
  clearOrder: () => {},
});

export default StoreContext;
