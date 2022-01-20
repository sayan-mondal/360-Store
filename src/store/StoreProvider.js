import { useReducer } from "react";

import StoreContext from "./store-context";

const defaultStoreState = {
  cartItems: [],
  cartTotalAmount: 0,
  orderItems: [],
  orderTotalAmount: 0,
};

const storeReducer = (state, action) => {
  if (action.type === "ADDTOCART") {
    const updatedTotalAmount =
      state.cartTotalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.cartItems[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.cartItems.concat(action.item);
    }

    return {
      cartItems: updatedItems,
      cartTotalAmount: updatedTotalAmount,
      orderItems: state.orderItems,
      orderTotalAmount: state.orderTotalAmount,
    };
  }
  if (action.type === "REMOVEFROMCART") {
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.cartItems[existingCartItemIndex];
    const updatedTotalAmount = state.cartTotalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.cartItems.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      cartItems: updatedItems,
      cartTotalAmount: updatedTotalAmount,
      orderItems: state.orderItems,
      orderTotalAmount: state.orderTotalAmount,
    };
  }

  if (action.type === "CLEARCART") {
    localStorage.removeItem("cart");
    return {
      cartItems: [],
      cartTotalAmount: 0,
      orderItems: state.orderItems,
      orderTotalAmount: state.orderTotalAmount,
    };
  }

  if (action.type === "ADDTOORDER") {
    return {
      cartItems: state.cartItems,
      cartTotalAmount: state.cartTotalAmount,
      orderItems: action.items,
      orderTotalAmount: action.totalAmount,
    };
  }

  if (action.type === "CLEARORDER") {
    return {
      cartItems: state.cartItems,
      cartTotalAmount: state.cartTotalAmount,
      orderItems: [],
      orderTotalAmount: 0,
    };
  }

  return defaultStoreState;
};

const StoreProvider = (props) => {
  const [storeState, dispatchStoreAction] = useReducer(
    storeReducer,
    defaultStoreState
  );

  const addItemToCartHandler = (item) => {
    dispatchStoreAction({ type: "ADDTOCART", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchStoreAction({ type: "REMOVEFROMCART", id: id });
  };

  const clearCartHandler = () => {
    dispatchStoreAction({ type: "CLEARCART" });
  };

  const addItemsToOrderHandler = (items, totalAmount) => {
    dispatchStoreAction({
      type: "ADDTOORDER",
      items: items,
      totalAmount: totalAmount,
    });
  };

  const clearOrderHandler = () => {
    dispatchStoreAction({ type: "CLEARORDER" });
  };

  const storeContext = {
    cartItems: storeState.cartItems,
    cartTotalAmount: storeState.cartTotalAmount,
    orderItems: storeState.orderItems,
    orderTotalAmount: storeState.orderTotalAmount,
    addItemToCart: addItemToCartHandler,
    removeItemFromCart: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    addItemsToOrder: addItemsToOrderHandler,
    clearOrder: clearOrderHandler,
  };
  return (
    <StoreContext.Provider value={storeContext}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
