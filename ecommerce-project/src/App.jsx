import './App.css'
import { Homepage } from './pages/Homepage'
import { Routes, Route } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />

      </Routes>
    </>
  )
}

export default App
