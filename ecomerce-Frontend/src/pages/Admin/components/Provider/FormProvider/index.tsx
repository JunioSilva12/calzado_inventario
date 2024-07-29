import { makePrivateRequest, makeRequest } from "../../../../../core/utils/request";
import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";

export type FormProvState = {
  name: string;
  cod: number;
  ref: string
}

type ParamsType = {
  providerId: string;
}

const FormProv= () => {
  // register
  const { register,  handleSubmit,  formState: { errors }, setValue } = useForm<FormProvState>();
  const history = useNavigate();
  const { providerId } = useParams<ParamsType>();

  const isEditing = providerId !== 'create';
  const formTitle = isEditing ? 'EDITAR PROVEEDOR' : 'REGISTRAR NUEVO PROVEEDOR';

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/provider/${providerId}` })
        .then((response: { data: { idProvider: number , name: string  , ref: string; }; }) => {
          setValue('name', response.data.name);
          setValue('cod', response.data.idProvider);
          setValue('ref', response.data.ref);
        })
    }

  }, [providerId, isEditing, setValue])

  const onSubmit = (data: FormProvState) => {
    makePrivateRequest({
      url: isEditing ? `/provider/${providerId}` : '/provider',
      method: isEditing ? 'PUT' : 'POST',
      data
    })
      .then(() => {
        toast.info('talla guardada con exito!')
        history('/admin/providers');
      })
      .catch(() => {
        toast.error('Error al guardar categoria!')
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm
        title={formTitle}
      >
        <div className="margin-bottom-30">
          <input
           {...register("cod",
              {
                required: "Campo obrigatorio",
                minLength: { value: 1, message: 'El campo debe tener minimo 1 caracteres' },
                maxLength: { value: 30, message: 'El campo debe tener maximo 30 caracteres' }
              }
            )}
            type="text"
            className="form-control input-base my-5"
            placeholder="codigo proveedor"
          />

          <input
           {...register("name",
              {
                required: "Campo obrigatorio",
                minLength: { value: 1, message: 'El campo debe tener minimo 1 caracteres' },
                maxLength: { value: 30, message: 'El campo debe tener maximo 30 caracteres' }
              }
            )}
            type="text"
            className="form-control input-base my-5"
            placeholder="Nombre proveedor"
          />
          <input
           {...register("ref",
              {
                required: "Campo obrigatorio",
                minLength: { value: 1, message: 'El campo debe tener minimo 1 caracteres' },
                maxLength: { value: 30, message: 'El campo debe tener maximo 30 caracteres' }
              }
            )}
            type="text"
            className="form-control input-base my-5"
            placeholder="Referencia proveedor"
          />
          {errors.name && (
            <div className="invalid-feedback d-block">
              {errors.name.message}
            </div>
          )}
        </div>
      </BaseForm>
    </form>

  );
}

export default FormProv;

