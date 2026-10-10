import {
  useState,
  type FormEvent,
} from "react";
import { useProducts } from "../../hooks/useProducts";
import "./UpdateProduct.css";

const emptyForm = {
  name: "",
  price: "",
  category: "",
};

export default function UpdateProduct() {
  const { findProduct, updateProduct } = useProducts();
  const [productId, setProductId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function loadProduct(): void {
    const numericId = Number(productId.trim());

    if (!Number.isInteger(numericId)) {
      setLoaded(false);
      setForm(emptyForm);
      setMessage("Enter a valid product ID.");
      setIsError(true);
      return;
    }

    const product = findProduct(numericId);

    if (!product) {
      setLoaded(false);
      setForm(emptyForm);
      setMessage("Product not found.");
      setIsError(true);
      return;
    }

    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
    });
    setLoaded(true);
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const price = Number(form.price);

    if (price < 0 || Number.isNaN(price)) {
      setMessage("Enter a valid price.");
      setIsError(true);
      return;
    }

    const numericId = Number(productId.trim());
    const updated = updateProduct(numericId, {
      id: numericId,
      name: form.name,
      price,
      category: form.category,
    });

    setMessage(
      updated
        ? "Product updated successfully."
        : "Product not found."
    );
    setIsError(!updated);
  }

  return (
    <section className="update-product">
      <h2>Update Product</h2>

      <div className="update-lookup">
        <label htmlFor="update-product-id">Product ID</label>
        <input
          id="update-product-id"
          value={productId}
          onChange={(event) => {
            setProductId(event.target.value);
            setLoaded(false);
            setForm(emptyForm);
            setMessage("");
          }}
        />

        <button type="button" onClick={loadProduct}>
          Load Product
        </button>
      </div>

      {loaded && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="update-product-name">Name</label>
          <input
            id="update-product-name"
            required
            value={form.name}
            onChange={(event) =>
              setForm({ ...form, name: event.target.value })
            }
          />

          <label htmlFor="update-product-price">Price</label>
          <input
            id="update-product-price"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.price}
            onChange={(event) =>
              setForm({ ...form, price: event.target.value })
            }
          />

          <label htmlFor="update-product-category">
            Category
          </label>
          <input
            id="update-product-category"
            required
            value={form.category}
            onChange={(event) =>
              setForm({
                ...form,
                category: event.target.value,
              })
            }
          />

          <button type="submit">Update Product</button>
        </form>
      )}

      {message && (
        <p
          className={
            isError ? "update-error" : "update-success"
          }
        >
          {message}
        </p>
      )}
    </section>
  );
}
