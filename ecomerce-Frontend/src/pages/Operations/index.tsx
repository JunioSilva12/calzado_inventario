import { Routes , Route} from 'react-router-dom';
import Navbar from './components/Navbar';
//import Products from './components/Products';
//import PrivateRoutes from '../../core/components/Routes/PrivateRoutes';
import './styles.scss';
//import Categories from './components/Categories';
import Inputs from './components/Inputs';
import Outputs from './components/Outputs';


const Operations = () =>(
  <div className="op-container">
    <Navbar/>
    <div className="op-content">
    <Routes>
     
      
        <Route path="/inputs/*" element={<Inputs />} />
        <Route path="/outputs/*" element={<Outputs />} />

      

     
      </Routes>
    </div>
  </div>
);
// element={<PrivateRoutes  allowedRoutes={['ROLE_ADMIN']} />} 
export default Operations;