import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import "./DeleteProduct.css";

export default function DeleteProduct() {
  const { deleteProduct } = useProducts();
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function handleDelete(): void {
    const trimmedProductId = productId.trim();

    if (!trimmedProductId) {
      setMessage("Enter a product ID.");
      setIsError(true);
      return;
    }

    const numericProductId = Number(trimmedProductId);

    if (Number.isNaN(numericProductId)) {
      setMessage("Enter a valid product ID.");
      setIsError(true);
      return;
    }

    const deleted = deleteProduct(numericProductId);

    if (!deleted) {
      setMessage("Product not found.");
      setIsError(true);
      return;
    }

    setProductId("");
    setMessage("Product deleted successfully.");
    setIsError(false);
  }

  return (
    <section className="delete-product">
      <h2>Delete Product</h2>

      <label htmlFor="delete-product-id">Product ID</label>

      <div className="delete-controls">
        <input
          id="delete-product-id"
          value={productId}
          onChange={(event) => {
            setProductId(event.target.value);
            setMessage("");
          }}
        />

        <button type="button" onClick={handleDelete}>
          Delete Product
        </button>
      </div>

      {message && (
        <p
          className={
            isError ? "delete-error" : "delete-success"
          }
        >
          {message}
        </p>
      )}
    </section>
  );
}
