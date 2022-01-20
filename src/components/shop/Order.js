import React, { useContext } from "react";
import Card from "../UI/Card";
import OrderItem from "./OrderItem";
import classes from "./Order.module.css";
import { useNavigate } from "react-router-dom";
import StoreContext from "../../store/store-context";

const Order = () => {
  const storeCtx = useContext(StoreContext);
  const navigate = useNavigate();

  const totalAmount = `₹${storeCtx.orderTotalAmount.toFixed(2)}`;

  const homeButtonHandler = () => {
    storeCtx.clearOrder();
    navigate("/");
  };

  const orderItems = (
    <ul className={classes["cart-items"]}>
      {storeCtx.orderItems.map((item) => (
        <OrderItem
          key={item.id}
          title={item.name}
          amount={item.amount}
          price={item.price}
        />
      ))}
    </ul>
  );

  return (
    <Card>
      <h1 className={classes.header}>Order Successfully Placed!</h1>
      {orderItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes.button} onClick={homeButtonHandler}>
          Home
        </button>
      </div>
    </Card>
  );
};

export default Order;
