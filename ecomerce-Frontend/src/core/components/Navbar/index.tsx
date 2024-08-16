import { getAccessTokenDecoded, logout ,isTokenValid} from '../../utils/auth';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate   } from 'react-router-dom';
import './styles.scss';
import menu from '../../assets/images/menu.svg';

const Navbar = () => {
  const [drawerActive, setDrawerActive] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [isLogged, setLogged] = useState(false);
  const location = useLocation();
  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const currentUserData = getAccessTokenDecoded();
    const isLogged = isTokenValid();
    //console.log("la data..",isLogged);
    if (isLogged) {
      setLogged(true);
    }
    setCurrentUser(currentUserData.name);

  }, [location])

  const history = useNavigate ();
  useEffect(() => {
    // Función para manejar clic fuera del cuadro
    const handleClickOutside = (event: MouseEvent  | TouchEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setDrawerActive(false)// Llama al evento si el clic es fuera del cuadro
      }
    };

    // Agregar el evento de clic al documento
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);


    // Eliminar el evento al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);

    };
  }, [setDrawerActive]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogout = () => {
    //event.preventDefault();
    history('/auth/login');
    
    logout();
    setLogged(false);
  }
  
  useEffect(() => {

   
    const token = getAccessTokenDecoded()
    //console.log("ok",token)
    if (token.name) {
      

      if (!(isTokenValid())) {
        // El token ha expirado
        handleLogout();
      } 
    }
  }, [handleLogout,isLogged]);




  return (
    <nav ref={boxRef} className="bg-primary main-nav">

      <Link to="/products" className="nav-logo-text">
        <h4>CALZADO CALIXSPORT</h4>
      </Link>
      <button
        className="menu-mobile-btn"
        type="button"
        onClick={() => setDrawerActive(!drawerActive)}
      >
        <img src={menu} alt="Mobile Menu" />
      </button>

      <div className={drawerActive ? "menu-mobile-container" : "menu-container"}>
        <ul className="main-menu">
         
          <li>
            <NavLink 
              className="nav-link" 
              onClick={() => setDrawerActive(false)} 
              to="/products"
            >
              CATÁLOGO
            </NavLink>
          </li>

          <li>
            <NavLink 
              className="nav-link" 
              onClick={() => {setDrawerActive(false)}}
              to="/admin"
            >
              ADMIN
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              className="nav-link" 
              onClick={() => {setDrawerActive(false)}}
              to="/operations"
            >
              OPERACIONES
            </NavLink>
          </li>

          {
            drawerActive && (
              
                                 
                 (  isLogged )&& (
                  <li>
                    <a 
                      href="#logout" 
                      className="nav-link active d-inline"
                      onClick={() => {
                        setDrawerActive(false)
                        handleLogout()
                      }}
                    >
                      {`LOGOUT - ${currentUser}`}
                    </a>
                    </li>
                  )
                
              
            )
          }
          {
            drawerActive && (
              <>
                {!(isLogged) && (
                  <li>
                    <Link 
                      to="/auth/login" 
                      className="nav-link active"
                      onClick={() => setDrawerActive(false)}
                    >
                      LOGIN
                    </Link>
                  </li>
                )}

              </>
            )
          }
        </ul>
      </div>

      <div className="user-info-dnone text-right">
        {(isLogged) && (
          <>
            {currentUser}
            <a
              href="#logout"
              className="nav-link active d-inline"
              onClick={() => {
                
                setDrawerActive(false)
                handleLogout()

              }}
            >
              LOGOUT
            </a>
          </>
        )}
        {!(isLogged) && (
          <Link 
            to="/auth/login" 
            className="nav-link active" 
            onClick={() => setDrawerActive(false)}
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  )
};

export default Navbar;