import { useContext, useEffect, useState } from "react";
import StoreContext from "../../store/store-context";
import classes from "./CartButton.module.css";
import CartIcon from "./CartIcon";

const CartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHiglighted] = useState(false);
  const storeCtx = useContext(StoreContext);

  const items = storeCtx.cartItems;

  const numberOfCartItem = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHiglighted(true);

    const timer = setTimeout(() => {
      setBtnIsHiglighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default CartButton;
