//import jwtDecode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

import history from './history';


export const CLIENT_ID = 'catalogo';
export const CLIENT_SECRET = 'catalog123';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  firstName: string;
  userId: number;
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
  exp: number;
  name: string;
  role: Role;

}

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
  try {const sessionData = localStorage.getItem('authData') ?? '{}';
  const parsedSessionData = JSON.parse(sessionData);
 //console.log(".l.",parsedSessionData.data.user)
  return parsedSessionData as LoginResponse;
}catch(err){
  console.log(err)
}
}

export const getAccessTokenDecoded = () => {
  const sessionData = getSessionData() ?? JSON.parse(localStorage.getItem('authData')  ?? '{}');
 //console.log(".l.",sessionData)
  try {
    const tokenDecoded = jwtDecode(sessionData.data.token);
 //   console.log(tokenDecoded)
    return tokenDecoded as AccessToken;
  } catch (error){
    return {} as AccessToken;
  }
}

export const isTokenValid = () => {
  try {
      const { exp } = getAccessTokenDecoded();
  // console.log("exp..",exp)
  return Date.now() <= exp * 1000;
  } catch (error) {
    return false
  }

 
}

export const isAuthenticated = () => {
  const sessionData = getSessionData() ?? JSON.parse(localStorage.getItem('authData')  ?? '{}');

  if(!sessionData.data){return false}
   // console.log("...b",sessionData);
 // console.log("...c",isTokenValid());
 return (sessionData.data.token && isTokenValid()) ?
  true : false
}

export const isAllowedByRole = (routesRoles: Role[] = []) => {
  if (routesRoles.length === 0) {
    return true;
  }

  const { role } = getAccessTokenDecoded();
  console.log("...d",role)
  return routesRoles.some(role => role?.includes(role));

}

export const logout = () =>{
  localStorage.removeItem('authData');
  history.replace('/auth/login');
}