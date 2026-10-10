import Navbar from "./Navbar"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import News from "./components/News"
import About from "./components/About"
import Contact from "./components/Contact"
import { createElement, type ComponentType } from "react";


function App() {


  return (
    <BrowserRouter>
     
           <Navbar />


      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={createElement(About as unknown as ComponentType)}></Route>
        <Route path="/news" element={createElement(News as unknown as ComponentType)}></Route>
        <Route path="/contact" element={createElement(Contact as unknown as ComponentType)}></Route>
      </Routes>

    </BrowserRouter>
  )

}

export default App
