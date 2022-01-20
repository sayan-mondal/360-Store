import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NoProductsFound from "../components/shop/NoProductsFound";
import ProductList from "../components/shop/ProductList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllProducts } from "../lib/api";

const ProductListing = () => {
  const params = useParams();

  const { categoryId } = params;

  const {
    sendRequest,
    status,
    data: requestedProduct,
    error,
  } = useHttp(getAllProducts, true);

  useEffect(() => {
    sendRequest(categoryId);
  }, [sendRequest, categoryId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (
    status === "completed" &&
    (!requestedProduct || requestedProduct.length === 0)
  ) {
    return <NoProductsFound />;
  }

  return <ProductList products={requestedProduct} />;
};

export default ProductListing;
