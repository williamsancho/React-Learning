import './App.css'
import { Homepage } from './pages/Homepage'
import { Routes, Route } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  )
}

export default App
