import axios from "axios";

export const ProductsData = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.in/api/products");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
