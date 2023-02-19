import './App.css'
import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';


import Main from '../views/Main/Main';
import Portfolio from '../views/Portfolio/Portfolio';
import Shop from '../views/Shop/Shop';
import Product from '../views/Product/Product';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/perretes" element={<Product />} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
  )
}

export default App
