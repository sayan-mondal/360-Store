import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MyCart from "./pages/MyCart";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CategoryListing from "./pages/CategoryListing";
import Success from "./pages/Success";
import StoreProvider from "./store/StoreProvider";
import ProductListing from "./pages/ProductListing";

function App() {
  return (
    <StoreProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/categories" />} />
          <Route path="/categories" element={<CategoryListing />} />
          <Route path="/categories/:categoryId" element={<ProductListing />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/order" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </StoreProvider>
  );
}

export default App;
