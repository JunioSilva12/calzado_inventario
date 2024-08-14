import { makePrivateRequest, makeRequest } from '../../../../../core/utils/request';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
//import Select from 'react-select';
import BaseForm from '../../BaseForm';
import './styles.scss';
import {  useParams , useNavigate } from 'react-router-dom';
import { SetStateAction, useCallback, useEffect } from 'react';
import { useState } from 'react';
import {  Category, Inventory, Product } from '../../../../../core/types/Product';


import StateManagedSelect from 'react-select';
import { TransactionType } from '../../../../../core/types/Transaction';
import Card from '../../Card';
import ProductFilters from '../../../../../core/components/ProductFilters';
import { Provider } from '../../../../../core/types/Provider';
//import { TextField, Checkbox } from "@material-ui/core"
export type FormState = {

 
  product:Product;
  sizeID:Inventory | null;
  quantity1:number;
  
}


const Form = () => {
  //register, 
  const { register, handleSubmit, formState: { errors },watch, control , setValue } = useForm<FormState>();
  const history = useNavigate();
  const { inputId } = useParams();
  console.log("tipo de formulario >>",inputId)
  //const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingSizes, setIsLoadingSizes] = useState(false);
  //const [categories, setCategories] = useState<Category[]>([]);

  const [productsLoaded, setProducts] = useState<Product[]>([]);
  
  const [sizes, setSizes] = useState<Inventory[]>([]);
  //const [selectedSize, setSelectedSize] = useState<Size>();
  //const [maxCant, setMaxCant] = useState<number>(0);
  const selectedProduct = watch('product');
  const selectedSize = watch('sizeID');
 // const [updatedInventories, setUpdatedInventories] = useState<Inventory[]>([]);
  const isEditing = inputId !== 'create';
  const formTitle = isEditing ? 'EDITAR SALIDA' : 'REGISTRAR SALIDA';
  const valueMaxCant: string | number = selectedSize?.stock ?? '';


  //const selectedSizesStock = watch('sizes');
  console.log('inputId',inputId);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>();
  const [provider, setProvider] = useState<Provider>();
  
  const handleChangeName = (name: string) => {
  
    setName(name);
  }

  const handleChangeCategory = (category: Category) => {
  
    setCategory(category);
  }
  const handleChangeProvider = (prov: Provider) => {

    setProvider(prov);
  }

  const clearFilters = () => {
   
    setCategory(undefined);
    setName('');
    setProvider(undefined);

  }
  const getProducts = useCallback(() => {
    const params = {
   
  
      name: name,
      provider:provider?.idProvider,
      categoryId: category?.id

    }
    setIsLoadingProducts(true);
    makeRequest({ url: '/product', params })
      .then((response: { data: {content: SetStateAction<Product[]>}; }) => {
        
        setProducts(response.data.content)
        console.log("products...",response.data)
      
      })
      .finally(() => {
        setIsLoadingProducts(false);
      
      })
  }, [name, category,provider]);

  useEffect(() => {
    getProducts();
  
  }, [getProducts]);





  

 
    
  useEffect(() => {
//   console.log('datos/size: ',data)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newSize:Inventory[] = [];
selectedProduct?.inventories?.forEach((inv) => {
if (inv) {
 
  newSize.push({
   
    size:  inv.size,
    stock:inv.stock
});
}

   } 

 
   )

   if (selectedSize?.stock !== undefined) {
  //  setMaxCant(selectedSize?.stock);
    
  }

    setSizes(newSize);
    setIsLoadingSizes(false);
       }, [selectedSize,selectedProduct])



       useEffect(() => {
        if (selectedSize?.stock !== undefined) {
         // setMaxCant(selectedSize?.stock);
          
        }
        
      
        
          
            //setSizes(newSize);
           // setIsLoadingSizes(false);
               }, [selectedSize])
        

  const onSubmit = (data: FormState) => {
    

    const payload ={
     
        productId: data.product.id,
        SizeId: data.sizeID?.size,
         // Solo la fecha, con hora 00:00:00
         type: TransactionType.Exit,
        quantity: data.quantity1,
    
    
    
    }


    console.log("payload",payload);
    makePrivateRequest({
      url: isEditing ? `/transaction/${inputId}` : '/transaction',
      method: isEditing ? 'PUT' : 'POST',
      data:payload
    })
      .then(() => {
        toast.info('SALIDA guardado con exito!')
        history('/operations/outputs');
      })
      .catch(() => {
        toast.error('Error al guardar SALIDA!')
      })
  }


  const formatProductLabel = (option: Product) => (
    <div>   
        <Card key={option.id} product={option} /> 
    </div>
  );
  


  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <BaseForm
        title={formTitle}
      >
  <div className="product-filter">
<ProductFilters
          name={name}
          category={category}
          handleChangeCategory={handleChangeCategory}
          handleChangeName={handleChangeName}
          clearFilters={clearFilters}
          handleChangeProvider={handleChangeProvider}
          provider={provider}
        />
        </div>
        <div className="product-form-container">
       

            
        <div className="col-base ">
          
            
    
            <div className="margin-bottom-30">
              <Controller
               
                
              
                  name="product"
                  control={control}
                  render={({ field }) => <StateManagedSelect  {...field} 
                  options={productsLoaded}
                  isLoading={isLoadingProducts}
                  formatOptionLabel={formatProductLabel}
                  getOptionValue={(option: Product) => String(option.id)}
                  className="product-select"
                  placeholder="producto..."
                  onChange={(value) => {
                    setValue("sizeID",null);
                    field.onChange(value);
                  }}
                  
                  />
            }
               
              rules={{ required: 'Campo obrigatório' }}
              
              />
              {errors.product && (
                <div className="invalid-feedback d-block">
                  Campo obligatorio!
                </div>
              )}
            </div>



          </div>
          {selectedProduct && (
          <div className="col-base ">
          <div className="margin-bottom-30">
              <Controller
               
                
                 
                 
                  name="sizeID"
                  control={control}
                 
                  render={({ field }) => <StateManagedSelect  {...field} 
                  options={sizes}
                  isLoading={isLoadingSizes}
                  value={field.value}
                  getOptionLabel={(option: Inventory) => option.size.toString()}
                  getOptionValue={(option: Inventory) => String(option.size)}
                  className="categories-select"
                  placeholder="tallas..."
                  onChange={(value) => {
                    console.log('maxcant...',selectedSize?.stock)
                    
                    field.onChange(value);
                  }}
                  
                 
                 
            
                  />
            }
               
              rules={{ required: 'Campo obrigatório' }}
              
              />
              {errors.sizeID && (
                <div className="invalid-feedback d-block">
                  Campo obligatorio!
                </div>
              )}

            
            </div> 
          

            {selectedSize && (<div><p>Hay {selectedSize?.stock} calzados disponobles</p></div>)}
            <div className="margin-bottom-30">
               <input
          
           type="number"
           className="form-control input-base"
          defaultValue={1}
           min="1"
          
           placeholder="Stock"
        
           {...register(`quantity1`, { 
            required: 'Campo obligatorio', 
            min: { value: 1, message: 'El valor mínimo es 1' },
            max: { value: valueMaxCant, message: `El valor maximo es ${selectedSize?.stock}` },
           })}
         />
                 
                </div>
             
                  
          </div>)}
          


        </div>
      </BaseForm>
    </form>

  )
}

export default Form;