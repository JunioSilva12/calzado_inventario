import { makePrivateRequest, makeRequest } from "../../../../../core/utils/request";
import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";

export type FormSizeState = {
  size: string;
}

type ParamsType = {
  sizeId: string;
}

const FormSize= () => {
  // register
  const { register,  handleSubmit,  formState: { errors }, setValue } = useForm<FormSizeState>();
  const history = useNavigate();
  const { sizeId } = useParams<ParamsType>();

  const isEditing = sizeId !== 'create';
  const formTitle = isEditing ? 'EDITAR TALLA' : 'REGISTRAR NUEVA TALLA';

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/size/${sizeId}` })
        .then((response: { data: { size: string; }; }) => {
          setValue('size', response.data.size);
        })
    }

  }, [sizeId, isEditing, setValue])

  const onSubmit = (data: FormSizeState) => {
    makePrivateRequest({
      url: isEditing ? `/size/${sizeId}` : '/size',
      method: isEditing ? 'PUT' : 'POST',
      data
    })
      .then(() => {
        toast.info('talla guardada con exito!')
        history('/admin/sizes');
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
           {...register("size",
              {
                required: "Campo obrigatorio",
                minLength: { value: 1, message: 'El campo debe tener minimo 1 caracteres' },
                maxLength: { value: 10, message: 'El campo debe tener maximo 10 caracteres' }
              }
            )}
            type="text"
            className="form-control input-base"
            placeholder="Nueva talla"
          />
          {errors.size && (
            <div className="invalid-feedback d-block">
              {errors.size.message}
            </div>
          )}
        </div>
      </BaseForm>
    </form>

  );
}

export default FormSize;

