import { useEffect } from "react";
import NoCategoriesFound from "../components/shop/NoCategoriesFound";
import CategoryList from "../components/shop/CategoryList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllCategories } from "../lib/api";

const CategoryListing = () => {
  const {
    sendRequest,
    status,
    data: requestedCategory,
    error,
  } = useHttp(getAllCategories, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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
    (!requestedCategory || requestedCategory.length === 0)
  ) {
    return <NoCategoriesFound />;
  }

  return <CategoryList categories={requestedCategory} />;
};

export default CategoryListing;
