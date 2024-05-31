import { makePrivateRequest, makeRequest } from '../../../../../core/utils/request';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
//import Select from 'react-select';
import BaseForm from '../../BaseForm';
import './styles.scss';
import {  useParams , useNavigate } from 'react-router-dom';
import { SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import { Category } from '../../../../../core/types/Product';
import PriceField from './priceField';
import ImageUpload from '../ImageUpload';
import StateManagedSelect from 'react-select';
//import { TextField, Checkbox } from "@material-ui/core"
export type FormState = {
  name: string;
  price: string;
  imgUrl: string;
  description: string;
  categories: Category[];
}
/*
type ParamsType = {
  productId: string;
}*/

const Form = () => {
  //register, 
  const { register ,handleSubmit,  formState: { errors }, setValue, control } = useForm<FormState>();
  const history = useNavigate();
  const { productId } = useParams();
  console.log("tipo de formulario >>",productId)
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState(''); 
  const [productImgUrl, setProductImgUrl] = useState(''); 
  
  const isEditing = productId !== 'create';
  const formTitle = isEditing ? 'EDITAR UN PRODUCTO' : 'REGISTRAR UN PRODUCTO';

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/product/${productId}` })
        .then((response: { data: { name: string ; price: string; imgUrl: SetStateAction<string>; description: string; categories: Category[]; }; }) => {
          setValue('name', response.data.name);
          setValue('price', response.data.price);
        
          setProductImgUrl(response.data.imgUrl);
          setValue('description', response.data.description);
          setValue('categories', response.data.categories);

        })
    }

  }, [productId, isEditing, setValue]);

  useEffect(() => {
    setIsLoadingCategories(true);
    makeRequest({ url: '/category' })
      .then((response: { data: { content: SetStateAction<Category[]>; }; }) => setCategories(response.data.content))
      .finally(() => setIsLoadingCategories(false));
  }, [])

  const onSubmit = (data: FormState) => {
    const payload ={
      ...data,
      imgUrl: uploadedImgUrl || productImgUrl
    }

    makePrivateRequest({
      url: isEditing ? `/product/${productId}` : '/product',
      method: isEditing ? 'PUT' : 'POST',
      data:payload
    })
      .then(() => {
        toast.info('Produto guardado con exito!')
        history('/admin/products');
      })
      .catch(() => {
        toast.error('Error al guardar produto!')
      })
  }

  const onUploadSuccess = (imgUrl: string) =>{
    setUploadedImgUrl(imgUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <BaseForm
        title={formTitle}
      >
        <div className="product-form-container">
          <div className="col-6">

            <div className="margin-bottom-30">
              <input

                type="text"
                className="form-control input-base"
                placeholder="Nombre del producto"
                 {...register("name",{
                required: 'Campo obrigatório',
                minLength: { value: 5, message: 'Este campo debe tener minimo 5 caracteres' },
                maxLength: { value: 60, message: 'Este campo debe tener maximo 60 caracteres' }
              })}
              />
              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="margin-bottom-30">
              <Controller
               
                
                  defaultValue={[]}
                  name="categories"
                  control={control}
                  render={({ field }) => <StateManagedSelect  {...field} 
                  options={categories}
                  isLoading={isLoadingCategories}
                  getOptionLabel={(option: Category) => option.name}
                  getOptionValue={(option: Category) => String(option.id)}
                  classNamePrefix="categories-select"
                  placeholder="Categorias..."
                  isMulti
                  />
            }
               
              rules={{ required: 'Campo obrigatório' }}
              
              />
              {errors.categories && (
                <div className="invalid-feedback d-block">
                  Campo obligatorio!
                </div>
              )}
            </div>

            <div className="margin-bottom-30">
              <PriceField control={control}/>
              {errors.price && (
                <div className="invalid-feedback d-block">
                  {errors.price.message}
                </div>
              )}
            </div>

            <div className="margin-bottom-30">
              <ImageUpload 
                onUploadSuccess={onUploadSuccess}
                productImgUrl={productImgUrl}
              />      
            </div>
          </div>

          <div className="col-6">
            <textarea
             {...register( "description" ,{ required: "Campo obligatório" })}
              
              className="form-control input-base"
              placeholder="Descripcion"
              id=""
              cols={30}
              rows={10}
            />
            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
      </BaseForm>
    </form>

  )
}

export default Form;