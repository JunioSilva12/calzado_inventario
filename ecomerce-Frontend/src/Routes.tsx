import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './core/components/Navbar';
//import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/Catalog/components/ProductDetails';
import Home from './pages/Home';
import Auth from './pages/Auth';
//import Login from './pages/Auth/components/Login';
//import Products from './pages/Admin/components/Products';
//import Users from './pages/Admin/components/Users';
import Admin from './pages/Admin';
import PrivateRoutes from './core/components/Routes/PrivateRoutes';
//import Login from './pages/Auth/components/Login';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Catalog />} />
     <Route path="/products/:productId" element={<ProductDetails />} />
    {/*}  <Route path="/auth" element={<Auth />} />*/}
    <Route path="/" element={<PrivateRoutes />}>
         <Route path="/admin/*" element={<Admin/>} />
    </Route>
    
    {/*   <Route path="/admin/products/*" element={<Admin />} />
      <Route path="/admin/users/*" element={<Admin />} />
      <Route path="/admin/categories/*" element={<Admin />} />*/}
      <Route path="auth/*" element={<Auth />} >
        
      </Route>
     
      
      {/* Redirecciones */}
      <Route path="/auth" element={<Navigate to="/auth/login" />} />
     {<Route path="/admin" element={<Navigate to="/admin/products" />} />   }
    </Routes>
  </Router>
);

export default AppRoutes;
