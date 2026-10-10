import AddProduct from "./components/AddProduct/AddProduct";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./context/ProductContent";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>

        <h1>Product Management</h1>
        <Navbar/>


        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home />}/>
          {/* CRUD ROUTES */}
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/delete" element={<DeleteProduct />} />
        </Routes>

      </BrowserRouter>
    </ProductProvider>
  );
}
