import ButtonIcon from '../../../../core/components/ButtonIcon';
import { Link, useNavigate } from 'react-router-dom';
import  {useForm}  from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from '../../../../core/utils/request';
import { useState } from 'react';
import { saveSessionData } from '../../../../core/utils/auth';


type FormState = {
  email: string;
  password: string;
}
/*
interface StateType  {
  from: {
    pathname: string;
  };
}
*/

const Login = () => {
  //register, 
  const { register , handleSubmit, formState: { errors } } = useForm<FormState>( );
  const [hasError, setHasError] = useState(false);
  const history = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const {state} = useLocation();

  //const { from } = state || { from: { pathname: "/admin" } };

  const onSubmit = (data: FormState) => {
   
    
    makeLogin(data)
      .then((response: { data: { access_token: string; token_type: string; expires_in: number; scope: string; name: string; userId: number; }; }) => {
        setHasError(false);
        saveSessionData(response.data);
        history('/', { replace: true });
      })
      .catch(() => {
        setHasError(true);
      })
  }

  return (
    <AuthCard title={"login"}>

      {hasError && (
        <div className="alert alert-danger mt-5">
          Nombre de usuario o contraseña no válidos
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

        <div className="margin-bottom-30">
          <input
            type="email"
            className={`form-control input-base ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
            
            {...register('email', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}

          />
          {errors.email && (
            <div className="invalid-feedback d-block">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="margin-bottom-30">
          <input
            type="password"
            className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
            placeholder="contraseña"
           
          {...register("password" ,{ required: "Campo obrigatório", minLength: 5 })}
            
          />
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}
        </div>


        <Link to="/auth/recover" className="login-link-recover">
        ¿Olvidé la contraseña?
        </Link>

        <div className="login-submit">
          <ButtonIcon text="login" />
        </div>

        <div className="text-center">
          <span className="not-registered">
          ¿No tienes registro?
          </span>

          <Link to="/auth/register" className="login-link-register">
            REGISTAR
          </Link>

        </div>

      </form>
    </AuthCard>
  )
}

export default Login;