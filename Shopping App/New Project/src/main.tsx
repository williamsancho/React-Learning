import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ProductProvider } from "./context/ProductContent";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>
);
