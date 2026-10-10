import "./ProductList.css";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.id === "number" &&
    typeof product.name === "string" &&
    typeof product.category === "string" &&
    typeof product.price === "number"
  );
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:8080/api/products");

        if (!response.ok) {
          throw new Error(
            `Product request failed: ${response.status} ${response.statusText}`
          );
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data) || !data.every(isProduct)) {
          throw new Error("Product response must be an array of valid products.");
        }

        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="product-list">
      <h2>Products</h2>

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={4}>Loading products...</td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={4}>Unable to display products: {error}</td>
              </tr>
            )}
            {!loading && !error && products.length === 0 && (
              <tr>
                <td colSpan={4}>No products found.</td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
