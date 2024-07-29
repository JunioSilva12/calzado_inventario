import { Routes , Route} from 'react-router-dom';
import Navbar from './components/Navbar';
//import Products from './components/Products';
//import PrivateRoutes from '../../core/components/Routes/PrivateRoutes';
import './styles.scss';
//import Categories from './components/Categories';
import Users from './components/Users';
import Products from './components/Products';
import Categories from './components/Categories';
import Sizes from './components/Sizes';
import Provider from './components/Provider';

const Admin = () =>(
  <div className="admin-container">
    <Navbar/>
    <div className="admin-content">
    <Routes>
     
      
        <Route path="/products/*" element={<Products />} />
        <Route path="/categories/*" element={<Categories />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/sizes/*" element={<Sizes />} />
        <Route path="/providers/*" element={<Provider />} />
      

     
      </Routes>
    </div>
  </div>
);
// element={<PrivateRoutes  allowedRoutes={['ROLE_ADMIN']} />} 
export default Admin;