import axios from "axios";

export async function getSingleCategory(categoryId) {
  const response = await axios
    .post("https://dev.nazdik.in/api/category/detail/", {
      headers: {
        Accept: "application/json",
      },
      Bodyform: "data",
      Store: "1",
      store_category_id: categoryId,
    })
    .catch((error) => {
      throw new Error(error || "Could not fetch products.");
    });
  const data = response.data;

  return data.data;
}

export async function getAllCategories() {
  let i = 1;
  let data = { id: 1 };
  const transformedProducts = [
    { id: "*", name: "All Products", business_category_id: "*", image: null },
  ];
  while ((data = await getSingleCategory(i)) && data.id) {
    if (data.id) {
      transformedProducts.push(data);
    }
    i++;
  }
  return transformedProducts;
}

export async function getSingleProduct(productId) {
  const response = await axios.post("https://dev.nazdik.in/api/product/show", {
    headers: {
      Accept: "application/json",
    },
    Bodyform: "data",
    store: "1",
    product_id: productId,
  });
  const product_data = response.data.data;

  return product_data;
}

export async function getAllProducts(categoryId) {
  let i = 1;
  let data = { id: 1 };
  const fetchedProducts = [];
  while ((data = await getSingleProduct(i)) && data.id) {
    if (data.id) {
      fetchedProducts.push(data);
    }
    i++;
  }

  if (categoryId === "*") {
    return fetchedProducts;
  }

  categoryId = +categoryId;

  const transformedProducts = fetchedProducts.filter(
    (product) => product.category_id === categoryId
  );
  return transformedProducts;
}

// export async function addCart(cartItems, cartTotalAmount) {
//   await client
//     .put("/cart.json", { cartItems, cartTotalAmount })
//     .catch((error) => {
//       throw new Error(error || "Unable to send cart data.");
//     });

//   return null;
// }

// export async function getCart() {
//   const response = await client.get("/cart.json").catch((error) => {
//     throw new Error(error || "Could not fetch cart.");
//   });
//   const data = response.data;

//   const transformedCart = [];

//   for (const key in data) {
//     const cartObj = {
//       id: key,
//       ...data[key],
//     };

//     transformedCart.push(cartObj);
//   }

//   return transformedCart;
// }
