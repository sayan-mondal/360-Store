import Grid from "@mui/material/Grid";
import CategoryItem from "./CategoryItem";
import classes from "./CategoryList.module.css";

const CategoryList = (props) => {
  return (
    <div className={classes.category}>
      <h1 className={classes.header}>Categories</h1>
      <Grid
        container
        spacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        alignItems="center"
        justifyContent="center"
      >
        {props.categories.map((category) => (
          <Grid item xs={2} sm={4} md={3} key={category.id}>
            <CategoryItem
              key={category.id}
              id={category.id}
              title={category.name}
              business_category_id={category.business_category_id}
              image={category.image}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryList;
