import axios, { AxiosRequestConfig } from 'axios';
//import qs from 'qs';
import {  getSessionData, logout } from './auth';


type LoginData = {
  email: string;
  password: string;
}

const BASE_URL = 'http://localhost:3000/api';
//const BASE_URL = 'http://localhost:3000/api';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.status === 401) {
   logout();
  }
  return Promise.reject(error);
});

export const makeRequest = (params: AxiosRequestConfig) => {
  console.log("axiosConf",params)
  return axios({
    ...params,
    baseURL: BASE_URL
  });
}

export const makePrivateRequest = (params: AxiosRequestConfig) => {
  const sessionData =getSessionData() ?? JSON.parse(localStorage.getItem('authData')  ?? '{}');
  //console.log("sessionData..",sessionData.data.token)
  const headers = {
    'Authorization': `Bearer ${sessionData.data.token}`
  }

  return makeRequest({ ...params, headers });

}

export const makeLogin = (loginData: LoginData) => {
  //const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

  /*const headers = {
    Authorization: `Basic ${window.btoa(token)}`,
    'Content-Type': 'X-Requested-With'
  }*/
  const headers = {
    'Content-Type': 'application/json'
  }

 // const payload = qs.stringify({ ...loginData, grant_type: 'password' });
 console.log(loginData)
 const payload = loginData
console.log(payload);
  return makeRequest({ url: 'auth/login', data: payload, method: 'POST', headers });

}