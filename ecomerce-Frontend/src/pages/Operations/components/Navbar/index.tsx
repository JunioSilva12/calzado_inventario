//import { isAllowedByRole } from '../../../../core/utils/auth';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const Navbar = () => (
  <nav className="op-nav-container">
    <ul>
      <li>
        <NavLink to="/operations/inputs" className="op-nav-item">Entradas</NavLink>
      </li>
      <li>
        <NavLink to="/operations/outputs" className="op-nav-item">Salidas</NavLink>
      </li>
     
      {/* {isAllowedByRole(['ROLE_ADMIN']) && (
        <li>
          <NavLink to="/admin/users" className="admin-nav-item">Menu usuários</NavLink>
        </li>
      )} */}
    </ul>
  </nav>
);

export default Navbar;