import classes from "./ProductItem.module.css";
import Card from "../UI/Card";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const { title, id, images, unit, selling_price, discount, tax_value } = props;

  const discountedPrice = selling_price - (discount / 100) * selling_price;
  const finalPrice = +discountedPrice + +tax_value;

  return (
    <li className={classes.item}>
      <Card>
        <Link className={classes.link} to={`/products/${id}`}>
          <header>
            <img className={classes.image} src={images[0].images} alt="Img" />
            <h3>{title}</h3>
            <div className={classes.price}>
              ₹{finalPrice}/{unit.alternate_name}
            </div>
          </header>
        </Link>
      </Card>
    </li>
  );
};

export default ProductItem;
