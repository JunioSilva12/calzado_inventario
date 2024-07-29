import { makePrivateRequest, makeRequest } from "../../../../../core/utils/request";
import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";

export type FormCategoryState = {
  name: string;
}

type ParamsType = {
  categoryId: string;
}

const FormCategory = () => {
  // register
  const { register,  handleSubmit,  formState: { errors }, setValue } = useForm<FormCategoryState>();
  const history = useNavigate();
  const { categoryId } = useParams<ParamsType>();

  const isEditing = categoryId !== 'create';
  const formTitle = isEditing ? 'EDITAR CATEGORIA' : 'REGISTRAR NUEVA CATEGORIA';

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/categories/${categoryId}` })
        .then((response: { data: { name: string; }; }) => {
          setValue('name', response.data.name);
        })
    }

  }, [categoryId, isEditing, setValue])

  const onSubmit = (data: FormCategoryState) => {
    makePrivateRequest({
      url: isEditing ? `/category/${categoryId}` : '/category',
      method: isEditing ? 'PUT' : 'POST',
      data
    })
      .then(() => {
        toast.info('categoria guardada con exito!')
        history('/admin/categories');
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
           {...register("name",
              {
                required: "Campo obrigatorio",
                minLength: { value: 3, message: 'El campo debe tener minimo 3 caracteres' },
                maxLength: { value: 60, message: 'El campo debe tener minimo 3 caracteres' }
              }
            )}
            type="text"
            className="form-control input-base"
            placeholder="Nuevo Nombre de la categoria"
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

export default FormCategory;

