import type { Product } from "../model/product";

const STORAGE_KEY = "vite-products";

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.productId === "number" &&
    typeof product.name === "string" &&
    typeof product.price === "number" &&
    typeof product.category === "string"
  );
}

export function loadProducts(initialProducts: Product[]): Product[] {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEY);

    if (!savedProducts) {
      return initialProducts;
    }

    const parsedProducts: unknown = JSON.parse(savedProducts);

    return Array.isArray(parsedProducts) &&
      parsedProducts.every(isProduct)
      ? parsedProducts
      : initialProducts;
  } catch {
    return initialProducts;
  }
}

export function addProduct(product: Product) {
  fetch("http://localhost:8080/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  })
    .then(res => res.text())
    .then(msg => console.log(msg));
}

