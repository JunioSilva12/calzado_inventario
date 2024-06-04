import { isAllowedByRole, isAuthenticated, Role } from '../../utils/auth';

import {    Navigate , Outlet } from 'react-router-dom';

type Props = {
 /*element: React.ReactNode;
  path: string;*/
  allowedRoutes?: Role[];
}




const PrivateRoutes= ({allowedRoutes }: Props) => {
  
console.log("...a",isAllowedByRole(allowedRoutes), isAuthenticated());
  if ( !isAuthenticated()  ){ return( <Navigate to="/auth/login" replace /> ) ;
    
}if (!isAllowedByRole(allowedRoutes) )  {
  console.log("isRol....",isAllowedByRole(allowedRoutes))
    return ( <Navigate to="/home" replace /> )
  } else {
    return <Outlet />
  }


};

export default PrivateRoutes;