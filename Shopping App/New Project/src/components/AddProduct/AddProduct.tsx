import { useState, type FormEvent } from "react";
import "./AddProduct.css";

const initialForm = {
  
  name: "",
  price: "",
  category: ""
};

export default function AddProduct() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const price = Number(form.price);

    if (price < 0 || Number.isNaN(price)) {
      setMessage("Enter a valid price.");
      setIsError(true);
      return;
    }

    const product = {
      
      name: form.name,
      price,
      category: form.category,
    };

    try {
      const response = await fetch("http://localhost:8080/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        setMessage("Failed to add product.");
        setIsError(true);
        return;
      }

      const backendMessage = await response.text();

      setMessage(backendMessage);
      setIsError(false);
      setForm(initialForm);

      // Optional: update React context

    } catch (error) {
      console.error(error);
      setMessage("Server error.");
      setIsError(true);
    }
  }

  return (
    <section className="add-product">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
       

        <label htmlFor="add-product-name">Name</label>
        <input
          id="add-product-name"
          required
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
        />

        <label htmlFor="add-product-price">Price</label>
        <input
          id="add-product-price"
          type="number"
          min="0"
          step="0.01"
          required
          value={form.price}
          onChange={(event) =>
            setForm({ ...form, price: event.target.value })
          }
        />

        <label htmlFor="add-product-category">Category</label>
        <input
          id="add-product-category"
          required
          value={form.category}
          onChange={(event) =>
            setForm({ ...form, category: event.target.value })
          }
        />

        <button type="submit">Add Product</button>
      </form>

      {message && (
        <p className={isError ? "add-error" : "add-success"}>
          {message}
        </p>
      )}
    </section>
  );
}
