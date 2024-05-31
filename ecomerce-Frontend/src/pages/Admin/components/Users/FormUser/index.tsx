import { makePrivateRequest } from "../../../../../core/utils/request";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import './styles.scss';

export type FormUserState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  isAdmin: boolean;
  roles: [];
}


type ParamsType = {
  userId: string;
}

const FormUser = () => {
  //register
  const {  handleSubmit,register,  formState: { errors }, setValue } = useForm<FormUserState>();
  const history = useNavigate();
  const { userId } = useParams<ParamsType>();
  const [isPasswordEquals, setIsPasswordEquals] = useState(true);

  const isEditing = userId !== 'create';
  const formTitle = isEditing ? 'EDITAR UN USUARIO' : 'REGISTRAR UN USUARIO';

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/user/${userId}` })
        .then((response: { data: { firstName: string; lastName: string; email: string; }; }) => {
          setValue('firstName', response.data.firstName);
          setValue('lastName', response.data.lastName);
          setValue('email', response.data.email);
        })
    }

  }, [userId, isEditing, setValue])


  const onSubmit = (data: FormUserState) => {
    const payload = {

      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.isAdmin ?  "ROLE_ADMIN" :"ROLE_OPERATOR"
          
            
    }

    if (data.password === data.repeatPassword) {
      setIsPasswordEquals(true);
      console.log(payload);

      makePrivateRequest({
        url: isEditing ? `/user/${userId}` : '/user',
        method: isEditing ? 'PUT' : 'POST',
        data: payload
      })
        .then(() => {
          toast.info('Usuário guardado exitosamente!')
          history('/admin/users');
        })
        .catch((error: unknown) => {
          console.log(error);

          toast.error('Error al guardar Usuario!')
        })
    }
    else
      setIsPasswordEquals(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm
        title={formTitle}
      >

        <div className="name">
          <div className="first-name">
            <input
            {...register("firstName",
                {
                  required: "Campo obrigatório"
                }
              )}
              name="firstName"
              type="text"
              className="form-control input-base"
              placeholder="Nombre"
            />
            {errors.firstName && (
              <div className="invalid-feedback d-block">
                {errors.firstName.message}
              </div>
            )}
          </div>

          <div className="last-name">
            <input
             {...register("lastName",
                {
                  required: "Campo obrigatório"
                }
              )}
              name="lastName"
              type="text"
              className="form-control input-base"
              placeholder="apellido"
            />
            {errors.lastName && (
              <div className="invalid-feedback d-block">
                {errors.lastName.message}
              </div>
            )}
          </div>



        </div>

        <div className="email">
          <input
            {...register("email",
              {
                required: "Campo obrigatório",

                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Valores no corresponden al formato del e-mail"
                }
              }
            )}
            name="email"
            type="email"
            className="form-control input-base"
            placeholder="E-mail"
          />

          {errors.email && (
            <div className="invalid-feedback d-block">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="pass">
          <div className="password">
            <input
           {...register("password",
                {
                  required: "Campo obrigatório",
                  minLength: { value: 8, message: 'este campo debe tener mínimo 5 caracteres' },
                  maxLength: { value: 60, message: 'este campo debe tener máximo 60 caracteres' },
                  pattern: {
                    value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message: "Valores no corresponden al formato de la contraseña"
                  }
                }
              )}
              name="password"
              type="password"
              className="form-control input-base"

              placeholder="Digite la contraseña"
            />
            {errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="repeat-password">
            <input
             {...register("repeatPassword" ,
                {
                  required: "Campo obrigatorio",
                  minLength: { value: 8, message: 'este campo debe tener mínimo 5 caracteres' },
                  maxLength: { value: 60, message: 'este campo debe tener máximo 60 caracteres' },
                  pattern: {
                    value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message: "Valores no corresponden al formato de la contraseña"
                  }
                }
              )}
              name="repeatPassword"
              type="password"
              className="form-control input-base"
              placeholder="Repita la contraseña"

            />

            {!isPasswordEquals && (
              <div className="error-password">
               Las contraseñas digitadas deben ser iguales
              </div>
            )}
          </div>

        </div>

        <span className="span-password">
         La contraseña debe tener minimo 8 caracteres y contar con minimo 1 numero
        </span>

        <input
          {...register("isAdmin")}
          type="checkbox"
          name="isAdmin"
        /> Perfil Administrador
      </BaseForm>
    </form >

  );

}
export default FormUser;