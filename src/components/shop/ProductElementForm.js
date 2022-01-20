import classes from "./ProductElementForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductElementForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > props.quantity
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.back} onClick={backButtonHandler}>
        Back
      </div>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: 1,
          max: props.quantity,
          step: 1,
          defaultValue: "1",
        }}
      />
      <button>Add to Cart</button>
      {!amountIsValid && <p>Please enter a valid amount(1-30)</p>}
    </form>
  );
};

export default ProductElementForm;
