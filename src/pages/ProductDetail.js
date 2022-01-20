import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductElement from "../components/shop/ProductElement";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleProduct } from "../lib/api";

const ProductDetail = () => {
  const params = useParams();

  const { productId } = params;

  const {
    sendRequest,
    status,
    data: loadedProduct,
    error,
  } = useHttp(getSingleProduct, true);

  useEffect(() => {
    sendRequest(productId);
  }, [sendRequest, productId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedProduct.id) {
    return <p>No product found!</p>;
  }

  return (
    <ProductElement
      id={loadedProduct.id}
      category={loadedProduct.category}
      category_id={loadedProduct.category_id}
      description={loadedProduct.description}
      discount={loadedProduct.discount}
      discount_type={loadedProduct.discount_type}
      images={loadedProduct.images}
      name={loadedProduct.name}
      price={loadedProduct.price}
      quantity={loadedProduct.quantity}
      related_product={loadedProduct.related_product}
      selling_price={loadedProduct.selling_price}
      sku={loadedProduct.sku}
      status={loadedProduct.status}
      store_id={loadedProduct.store_id}
      tax={loadedProduct.tax}
      tax_percent={loadedProduct.tax_percent}
      tax_value={loadedProduct.tax_value}
      unit={loadedProduct.unit}
      unit_id={loadedProduct.unit_id}
    />
  );
};

export default ProductDetail;
