import { isAllowedByRole } from '../../../../core/utils/auth';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const Navbar = () => (
  <nav className="admin-nav-container">
    <ul>
      <li>
        <NavLink to="/admin/products" className="admin-nav-item">Calzados</NavLink>
      </li>
      <li>
        <NavLink to="/admin/categories" className="admin-nav-item">Categorias</NavLink>
      </li>
      <li>
        <NavLink to="/admin/sizes" className="admin-nav-item">Tallas</NavLink>
      </li>
      <li>
        <NavLink to="/admin/providers" className="admin-nav-item">Proveedores</NavLink>
      </li>
      {isAllowedByRole(['ROLE_ADMIN']) && (
        <li>
          <NavLink to="/admin/users" className="admin-nav-item">Menu usuários</NavLink>
        </li>
      )}
    </ul>
  </nav>
);

export default Navbar;