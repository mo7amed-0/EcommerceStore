import productsData from "./ProductsAPI";

export const ProductsData = async () => {
  try {
    // Return the products data directly since it's already imported
    return productsData;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
