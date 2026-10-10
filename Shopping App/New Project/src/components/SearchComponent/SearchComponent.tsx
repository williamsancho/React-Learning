import {
  useState,
  type KeyboardEvent,
} from "react";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../model/product";
import "./SearchComponent.css";

export default function SearchComponent() {
  const { findProduct } = useProducts();
  const [productId, setProductId] = useState("");
  const [result, setResult] = useState<Product | null>(null);
  const [searched, setSearched] = useState(false);

  function search(): void {
    const normalizedId = productId.trim();

    if (!normalizedId) {
      setResult(null);
      setSearched(false);
      return;
    }

    const numericId = Number(normalizedId);
    if (!Number.isInteger(numericId)) {
      setResult(null);
      setSearched(true);
      return;
    }

    setResult(findProduct(numericId) ?? null);
    setSearched(true);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === "Tab") {
      search();
    }
  }

  return (
    <section className="search-component">
      <h2>Search Product</h2>

      <div className="search-controls">
        <label htmlFor="search-product-id">Product ID</label>

        <input
          id="search-product-id"
          value={productId}
          placeholder="Enter product ID and press Tab"
          onChange={(event) => {
            setProductId(event.target.value);
            setSearched(false);
            setResult(null);
          }}
          onKeyDown={handleKeyDown}
        />

        <button type="button" onClick={search}>
          Search
        </button>
      </div>

      {searched && result && (
        <article className="search-result">
          <h3>{result.name}</h3>
          <p>
            <strong>Product ID:</strong> {result.id}
          </p>
          <p>
            <strong>Category:</strong> {result.category}
          </p>
          <p>
            <strong>Price:</strong> ${result.price.toFixed(2)}
          </p>
        </article>
      )}

      {searched && !result && (
        <h1 className="product-not-found">Product not found</h1>
      )}
    </section>
  );
}
