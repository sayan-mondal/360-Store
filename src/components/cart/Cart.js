import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "../../store/store-context";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const navigate = useNavigate();
  const storeCtx = useContext(StoreContext);

  const totalAmount = `$${storeCtx.cartTotalAmount.toFixed(2)}`;
  const hasItems = storeCtx.cartItems.length > 0;

  const cartItemRemoveHandler = (id) => {
    storeCtx.removeItemFromCart(id);
  };

  const cartItemAddHandler = (item) => {
    storeCtx.addItemToCart({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    storeCtx.addItemsToOrder(storeCtx.cartItems, storeCtx.cartTotalAmount);
    storeCtx.clearCart();
    navigate("/order");
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {storeCtx.cartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          title={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Card>
      <h1 className={classes.header}>Shopping Cart</h1>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={() => navigate(-1)}>
          Back
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </Card>
  );
};

export default Cart;
