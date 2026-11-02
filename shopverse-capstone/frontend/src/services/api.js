import axios from "axios";
import { fallbackProducts } from "../data/fallbackProducts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  timeout: 7000
});

export async function getProducts() {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch {
    console.warn("ShopVerse API unavailable; using local sample catalog.");
    return fallbackProducts;
  }
}

export async function getProduct(id) {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch {
    const product = fallbackProducts.find((item) => String(item.id) === String(id));
    if (!product) throw new Error("Product not found");
    return product;
  }
}
