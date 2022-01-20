import { useNavigate } from "react-router-dom";
import classes from "./NoProductsFound.module.css";

const NoProductsFound = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.noproducts}>
      <p>No products found!</p>
      <button className={classes.button} onClick={backButtonHandler}>
        Back
      </button>
    </div>
  );
};

export default NoProductsFound;
