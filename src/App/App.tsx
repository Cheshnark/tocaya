import './App.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { useEffect } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

import Main from '../views/Main/Main';
import Portfolio from '../views/Portfolio/Portfolio';
import Shop from '../views/Shop/Shop';
import Product from '../views/Product/Product';
import Admin from '../views/Admin/Admin';
import Login from '../views/Login/Login';
import NotFound from '../views/NotFound/NotFound';
import ThankYou from '../views/ThankYou/ThankYou';
import Init from '../views/Init/Init';


function App() {
  const { admin } = useAuthContext()
  const { logout } = useLogout();

  useEffect(() => {
    logout()
  },[])

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Init />} />
            <Route path='/sobre-mi' element={<Main />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/producto/:id" element={<Product />} />
            <Route path="/admin" element={ admin ? <Admin /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/login" element={ !admin ? <Login /> : <Navigate to="/admin" />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/gracias" element={<ThankYou />} />
        </Routes>
      </Router>
  )
}

export default App
