import './App.css'
import { Homepage } from './pages/Homepage'
import { Routes, Route } from 'react-router-dom'
import { Checkout } from './pages/Checkout'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </>
  )
}

export default App
