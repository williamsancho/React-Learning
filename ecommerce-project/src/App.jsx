import './App.css'
import { Homepage } from './pages/Homepage'
import { Routes, Route } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { useEffect, useState } from 'react'

function App() {
   const [cart, setCart] = useState([]);

   useEffect(() => {
        fetch('http://localhost:3000/api/cart-items')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        setCart(data);
    });
   }, []);
   

  return (
   
    <>
      <Routes>
        <Route path="/" element={<Homepage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage />} />

      </Routes>
    </>
  )
}

export default App
