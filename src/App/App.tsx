import './App.css'
import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

import Main from '../views/Main/Main';
import Portfolio from '../views/Portfolio/Portfolio';
import Shop from '../views/Shop/Shop';
import Product from '../views/Product/Product';
import Admin from '../views/Admin/Admin';
import Login from '../views/Login/Login';

function App() {
  const { admin } = useAuthContext()

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/perretes" element={<Product />} />
            <Route path="/admin" element={ admin ? <Admin /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/login" element={ !admin ? <Login /> : <Navigate to="/admin" />} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
  )
}

export default App
