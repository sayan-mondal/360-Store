import Grid from "@mui/material/Grid";
import ProductItem from "./ProductItem";
import classes from "./CategoryList.module.css";

const ProductList = (props) => {
  const categoryName = props.products[0].category.name;
  return (
    <section className={classes.product}>
      <h1 className={classes.header}>{categoryName}</h1>
      <Grid
        container
        spacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        alignItems="center"
        justifyContent="center"
      >
        {props.products.map((product) => (
          <Grid item xs={2} sm={4} md={4} key={product.id}>
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.name}
              category_id={product.category_id}
              images={product.images}
              price={product.price}
              unit={product.unit}
              selling_price={product.selling_price}
              discount={product.discount}
              tax_value={product.tax_value}
            />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default ProductList;
