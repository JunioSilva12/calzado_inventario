import { makePrivateRequest, makeRequest } from '../../../../../core/utils/request';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
//import Select from 'react-select';
import BaseForm from '../../BaseForm';
import './styles.scss';
import {  useParams , useNavigate } from 'react-router-dom';
import { SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import { Category, Inventory } from '../../../../../core/types/Product';
//import PriceField from './priceField';
import ImageUpload from '../ImageUpload';
import StateManagedSelect from 'react-select';
import { Provider } from '../../../../../core/types/Provider';
import { Size } from     '../../../../../core/types/size';
//import { TextField, Checkbox } from "@material-ui/core"
export type FormState = {
  name: string;
  imgUrl: string;
  categories: Category[];
  provider:Provider;
  sizes:Size[];
  inventories:Inventory[]
}


const Form = () => {
  //register, 
  const { register ,handleSubmit, watch, formState: { errors }, setValue, control } = useForm<FormState>();
  const history = useNavigate();
  const { productId } = useParams();
  console.log("tipo de formulario >>",productId)
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProviders, setIsLoadingProviders] = useState(false);
  const [isLoadingSizes, setIsLoadingSizes] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState(''); 
  const [productImgUrl, setProductImgUrl] = useState(''); 
 // const [updatedInventories, setUpdatedInventories] = useState<Inventory[]>([]);
  const isEditing = productId !== 'create';
  const formTitle = isEditing ? 'EDITAR CALZADO' : 'REGISTRAR CALZADO';


  const selectedSizes = watch('sizes');
  //const selectedSizesStock = watch('sizes');
  //console.log(selectedSizes);




  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/product/${productId}` })
        .then((response: { data: { name: string ; price: string; imgUrl: SetStateAction<string>; provider: Provider; categories: Category[];inventories: Inventory[]; }; }) => {
          console.log('el producto a cambiar es: ',response);
          setValue('name', response.data.name);
          setValue('provider', response.data.provider);
        

        
          setProductImgUrl(response.data.imgUrl);
         
          setValue('categories', response.data.categories);
          setValue('sizes', response.data.inventories.map((inv)=>({id:inv.size,size:inv.size.toString()})));

          response.data.inventories.map((inv)=>{
            if (inv.stock>0) {
              setValue(`inventories.${inv.size}.stock`, inv.stock); 
            }

           

})


        })
    }

  }, [productId, isEditing, setValue]);

  useEffect(() => {

    setIsLoadingCategories(true);
    setIsLoadingProviders(true);
    setIsLoadingSizes(true);

    makeRequest({ url: '/category' })
      .then((response: { data: { content: SetStateAction<Category[]>; }; }) => setCategories(response.data.content))
      .finally(() => setIsLoadingCategories(false));
 
     makeRequest({ url: '/provider' })
      .then((response: { data: { content: SetStateAction<Provider[]>; }; }) => setProviders(response.data.content))
      .finally(() => setIsLoadingProviders(false));


      makeRequest({ url: '/size' })
      .then((response: { data: { content: SetStateAction<Size[]>; }; }) => setSizes(response.data.content))
      .finally(() => setIsLoadingSizes(false));

 
    }, [])

  const onSubmit = (data: FormState) => {
    
 //   console.log('datos/size: ',data)
    const newInv:Inventory[] = [];
data.inventories.forEach((inv, indice) => {
if (inv) {
  inv.size=indice;
  console.log(inv,'..',indice)
  newInv.push(inv);
}

   } 

 
   )

   data.inventories=newInv;

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
          <div className="col-base ">

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
                  className="categories-select"
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
              <Controller
               
                
              
                  name="provider"
                  control={control}
                  render={({ field }) => <StateManagedSelect  {...field} 
                  options={providers}
                  isLoading={isLoadingProviders}
                  getOptionLabel={(option: Provider) => option.name}
                  getOptionValue={(option: Provider) => String(option.idProvider)}
                  className="categories-select"
                  placeholder="proveedor..."
                  
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
              <ImageUpload 
                onUploadSuccess={onUploadSuccess}
                productImgUrl={productImgUrl}
              />      
            </div>
          </div>

          <div className="col-base ">
          <div className="margin-bottom-30">
              <Controller
               
                
                  defaultValue={[]}
                  name="sizes"
                  control={control}
                  render={({ field }) => <StateManagedSelect  {...field} 
                  options={sizes}
                  isLoading={isLoadingSizes}
                  getOptionLabel={(option: Size) => option.size}
                  getOptionValue={(option: Size) => String(option.size)}
                  className="categories-select"
                  placeholder="tallas..."
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
            {(selectedSizes?.length > 0 )? (
               
              <div  className="">
                 <p>TALLAS:</p>  
              
                  { selectedSizes.map(size => (
                    
            <span key={size.id} className="badge  bg-primary my-2 mx-0">
             {size.size}
             <input
           
            type="number"
            className="cant-input form-control "
           defaultValue={1}
            min="1"
            placeholder="Stock"
         
            {...register(`inventories.${size.id}.stock`, { required: 'Campo obligatorio', min: { value: 1, message: 'El valor mínimo es 1' } })}
          />
              
           {errors.inventories && <span>{errors.inventories.message}</span>}
             
            </span> ))}
       
          
          
          </div>
        ):(
          <p>No hay tallas Registradas</p>
        )}
           

          </div>  
                  
          </div>
          


        </div>
      </BaseForm>
    </form>

  )
}

export default Form;