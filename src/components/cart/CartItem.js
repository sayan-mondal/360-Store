import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = +props.price;
  const formattedPrice = price.toFixed(2);
  const totalPrice = (props.price * props.amount).toFixed(2);

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.title}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{formattedPrice}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.action}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
      <div className={classes.totalPrice}>
        <p>{totalPrice}</p>
      </div>
    </li>
  );
};

export default CartItem;
