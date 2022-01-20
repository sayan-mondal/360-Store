import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  const price = +props.price;
  const formattedPrice = price.toFixed(2);
  const totalPrice = price * props.amount;
  const formattedTotalPrice = totalPrice.toFixed(2);

  return (
    <li className={classes["order-item"]}>
      <div>
        <h2>{props.title}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{formattedPrice}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.totalPrice}>
        <p>{formattedTotalPrice}</p>
      </div>
    </li>
  );
};

export default OrderItem;
