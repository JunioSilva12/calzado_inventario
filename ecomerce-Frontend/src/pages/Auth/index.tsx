import './styles.scss';
// import  AuthImage  from '../../core/assets/images/auth.svg';
//import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
//import { Route  } from 'react-router-dom';

//import { useState } from 'react';

/*
function MiComponente() {
  const location = useLocation();

  // Accede a la ruta actual
  const path = location.pathname;
console.log(path)
  if (path=="auth/login") {
    return (
      <div className='m-5'>
      <Login/> 
      </div>
    );
  } else {
   // return <Register />;
  }
}

*/
const Auth = () =>{
  //const componentToRender = true ? <Login /> : <Card />;
  const componentToRender =  <Login /> 
  return (<div className="auth-container">

    <div className="auth-content">
      
      
      
      {componentToRender}
 
      {/*  <Route path="/auth/register">
          <h1>Cadastro</h1>
        </Route>
        <Route path="/auth/recover">
          <h1>Recuperação</h1>
</Route>*/}


    </div>
  </div>);
}

export default Auth;