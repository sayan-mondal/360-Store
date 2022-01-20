import { useState } from "react";
import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "../../store/store-context";
import classes from "./ProductElement.module.css";
import ProductElementForm from "./ProductElementForm";
import ProductList from "./ProductList";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";

const ProductElement = (props) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const {
    id,
    category,
    description,
    discount,
    images,
    name,
    quantity,
    related_product,
    selling_price,
    sku,
    tax_value,
    unit,
  } = props;

  const maxSteps = images.length;

  const discountedPrice = selling_price - (discount / 100) * selling_price;
  const finalPrice = +discountedPrice + +tax_value;

  const storeCtx = useContext(StoreContext);

  const addToCartHandler = (amount) => {
    storeCtx.addItemToCart({
      id: id,
      name: name,
      amount: amount,
      price: finalPrice,
    });
    const cart = {
      cartItems: storeCtx.cartItems,
      cartTotalAmount: storeCtx.cartTotalAmount,
    };
    localStorage.setItem("cart", cart);
  };

  const backButtonHandler = () => {
    navigate(-1);
  };

  const productElementForm =
    quantity > 0 ? (
      <ProductElementForm
        id={id}
        quantity={quantity}
        onAddToCart={addToCartHandler}
      />
    ) : (
      <div className={classes.formElement2}>
        <button className={classes.back} onClick={backButtonHandler}>
          Back
        </button>
        <p className={classes.noProduct}>Sorry product not available!</p>
      </div>
    );

  const relatedProduct =
    related_product.length > 0 ? (
      <figure className={classes.element}>
        <ProductList products={related_product} />
      </figure>
    ) : (
      ""
    );

  return (
    <Fragment>
      <figure className={classes.element}>
        <figcaption>{name}</figcaption>
        <div className={classes.details}>
          <div className={classes.images}>
            <Box sx={{ width: 400, flexGrow: 1 }}>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {images.map((image, index) => (
                  <div key={image.id}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          height: 255,
                          display: "block",
                          maxWidth: 400,
                          overflow: "hidden",
                          width: "100%",
                        }}
                        src={image.images}
                        alt="Img"
                      />
                    ) : null}
                  </div>
                ))}
              </SwipeableViews>
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              />
            </Box>
          </div>
          <div className={classes.productDetails}>
            <div className={classes.productDetails1}>
              <div>
                <p className={classes.descriptionHeader}>Product details:</p>
                <div className={classes.sku}>S.K.U.: {sku}</div>
                <div className={classes.category}>
                  Category: {category.name}
                </div>
              </div>
              <div className={classes.prices}>
                <div className={classes.finalPrice}>
                  <div className={classes.price1}>₹ {finalPrice}</div>
                  <div className={classes.unit1}>/{unit.alternate_name}</div>
                </div>
                <div className={classes.sellingPrice}>
                  <div className={classes.price2}>₹ {selling_price}</div>
                  <div className={classes.unit2}>/{unit.alternate_name}</div>
                </div>
              </div>
            </div>
            <div>
              <p className={classes.descriptionHeader}>About this product:</p>
              <p className={classes.description}>{description}</p>
            </div>
            {productElementForm}
          </div>
        </div>
      </figure>
      {relatedProduct}
    </Fragment>
  );
};

export default ProductElement;
