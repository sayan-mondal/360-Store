import { Link, useNavigate } from "react-router-dom";
import CartButton from "../cart/CartButton";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const navigate = useNavigate();

  const cartButtonHandler = () => {
    navigate("/cart");
  };

  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="/categories">
        360 Store
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.home}>
            <Link to="/categories">Home</Link>
          </li>
          <li>
            <CartButton onClick={cartButtonHandler} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
