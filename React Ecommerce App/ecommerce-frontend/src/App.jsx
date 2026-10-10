import './App.css'
import { Homepage } from './pages/Homepage'
import { Routes, Route } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { useEffect, useState } from 'react'

function App() {
   const [cart, setCart] = useState([]);

   useEffect(() => {
        fetch('/api/cart-items?expand=product')
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
        <Route path="checkout" element={<CheckoutPage cart={cart} deliveryOption={deliveryOption} />} />
        <Route path="orders" element={<OrdersPage />} />

      </Routes>
    </>
  )
}

export default App
