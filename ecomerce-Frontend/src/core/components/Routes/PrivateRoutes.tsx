import {  isAuthenticated } from '../../utils/auth';

import {    Navigate , Outlet } from 'react-router-dom';






const PrivateRoutes= () => {
  
console.log("...a", isAuthenticated());
  if ( !isAuthenticated()  ){ return( <Navigate to="/auth/login" replace /> ) ;
    

  } else {
    return <Outlet />
  }


};

export default PrivateRoutes;