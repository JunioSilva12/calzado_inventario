//import ProductPrice from '../../../../../core/components/ProductPrice';
import {  useEffect, useState } from 'react';
//import { Inventory } from '../../../../core/types/Product';
import { makePrivateRequest, makeRequest } from '../../../../core/utils/request';
//import { Link } from 'react-router-dom';
import './styles.scss';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Size } from '../../../../core/types/size';
import {  useParams } from 'react-router-dom';
import StateManagedSelect from 'react-select';
import { Inventory } from '../../../../core/types/Product';
import cancelIcon from '/src/core/assets/images/cancel-icon.svg';
import acceptIcon from '/src/core/assets/images/accept-icon.svg';
//import { Link } from 'react-router-dom';
import { TransactionType } from '../../../../core/types/Transaction';

type Props = {
  productSizes: Inventory[]  | undefined;
  setCreating: (setCreating: boolean) => void;
  reload: () => void;
 
}

export type FormState = {
  size: Size;
  stock: number;
}

const InventoryForm = ({ productSizes , reload, setCreating }: Props) => {
  const { register ,handleSubmit, formState: { errors }, control } = useForm<FormState>();
  const [isLoadingSizes, setIsLoadingSizes] = useState(false);
  const [sizes, setSizes] = useState<Size[]>([]);
  const { productId } = useParams();
  //const history = useNavigate();
  useEffect(() => {

    setIsLoadingSizes(true);

      makeRequest({ url: '/size' })
      .then((response: { data: { content: Size[] }; }) => {

        const data : Size[] = response.data.content.filter(
          size => !productSizes?.some(item2 => (item2.size === size.id && item2.stock !== 0))
        );

        setSizes(data)
      
      })
      .finally(() => setIsLoadingSizes(false));

 
    }, [productSizes])

    
  const onSubmit = (data: FormState) => {
    
      console.log('datos/size: ',data)

    
      
   
      
   
       const payload ={
         ...data,
         idProduct: productId 
       }
   
       makePrivateRequest({
         url: `/inventory/` ,
         method:  'POST',
         data:payload
       })
         .then(() => {
           toast.info('talla agregada con exito!')
          // history(`/products/${productId}`);
           reload();
           setCreating(false);
         })
         .catch(() => {
          const payload2 ={
       
            productId: (parseInt(productId as unknown  as string, 10) || 0) ,
            SizeId: payload?.size.id,
             // Solo la fecha, con hora 00:00:00
             type: TransactionType.Entry,
            quantity: data.stock,
        
        
        
        }
    
    
        console.log("payload",payload2);
        makePrivateRequest({
          url: '/transaction',
          method:  'POST',
          data:payload2
        })
          .then(() => {
            toast.info(`${TransactionType.Entry} guardado con exito!`)
            reload();
          })
          .catch(() => {
            toast.error(`Error al guardar ${TransactionType.Entry}!`)
          })

      



          
         })
     }


     

  //console.log('::::',product.inventories);
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
    <div className="card-base product-form-cata">
   
               <div className="card-content ">
               <Controller
               
                
              
               name="size"
               control={control}
              
               render={({ field }) => <StateManagedSelect  {...field} 
               options={sizes}
               isLoading={isLoadingSizes}
               getOptionLabel={(option: Size) => option.size}
               getOptionValue={(option: Size) => String(option.size)}
               className="categories-select"
               placeholder="tallas..."
                
              
              
         
               />
         }
            
           rules={{ required: 'Campo obrigatório' }}
           
           />
            {errors.size && (
                <div className="invalid-feedback d-block">
                  Campo obligatorio!
                </div>
              )}
                 
                
          
               </div>
               <div className="card-content">
               <input
          
           type="number"
           className="cant-input form-control "
          defaultValue={1}
           min="1"
           placeholder="Stock"
        
           {...register(`stock`, { required: 'Campo obligatorio', min: { value: 1, message: 'El valor mínimo es 1' } })}
         />
                 
                </div>
               <div className="buttons-container-inv">
                
                 <button
                   type="button"
                   className=" btn  btn-outline-secondary border-radius-10 form-btn"                  
                   onClick={() =>  setCreating(false)}
                 >
                   <img  src={cancelIcon} alt="no"></img>                     
                 </button>  
                          
        <button  type="submit" className="btn btn-outline-primary border-radius-10 form-btn">
        <img  src={acceptIcon} alt="ok"></img>   
        </button>
        </div>
             </div>
             </form>

  )
}

export default InventoryForm;