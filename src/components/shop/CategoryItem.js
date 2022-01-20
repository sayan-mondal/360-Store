import classes from "./CategoryItem.module.css";
import Card from "../UI/Card";
import { Link } from "react-router-dom";

const CategoryItem = (props) => {
  const { title, id, image } = props;
  return (
    <li className={classes.item}>
      <Card>
        <Link className={classes.link} to={`/categories/${id}`}>
          <header>
            <img className={classes.image} src={image} alt="Img" />
            <h3>{title}</h3>
          </header>
        </Link>
      </Card>
    </li>
  );
};

export default CategoryItem;
