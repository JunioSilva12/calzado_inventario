//import ProductPrice from '../../../../../core/components/ProductPrice';
import { useEffect, useState } from 'react';
import { Inventory } from '../../../../core/types/Product';
import { TransactionType } from '../../../../core/types/Transaction';
//import { Link } from 'react-router-dom';
import './styles.scss';
import { isTokenValid } from '../../../../core/utils/auth';
//import trashIcon from '/src/core/assets/images/delete-icon.svg';
//import { Link } from 'react-router-dom';
import cancelIcon from '/src/core/assets/images/cancel-icon.svg';
import acceptIcon from '/src/core/assets/images/accept-icon.svg';
import masIcon from '/src/core/assets/images/mas-Icon.svg';
import menosIcon from '/src/core/assets/images/menos-icon.svg';
import deleteIcon from '/src/core/assets/images/delete-icon.svg';
import { useForm } from 'react-hook-form';
import { makePrivateRequest } from '../../../../core/utils/request';
import { toast } from 'react-toastify';
type Props = {
  productId:string | undefined;
  inventory: Inventory;
  key:number;
  onRemove: (inventory: Inventory) => void;
  reload: () => void;
}

export type FormState = {
   
    cant: number;
  }
const InventoryCard = ({ productId ,inventory, onRemove,reload }: Props) => {
  
  const [isLogged, setLogged] = useState(false);
  const [isOp, setOp] = useState(false);
  const [typeOp, setTypeOp] = useState<TransactionType>();
  const { register ,handleSubmit, formState: { errors } } = useForm<FormState>();




  useEffect(() => {
   
    const isLogged = isTokenValid();
    console.log("la data..",isLogged);
    if (isLogged) {
      setLogged(true);
    }
  
  }, []);
  //console.log('::::',product.inventories);

  




  const onSubmit = (data: FormState) => {
    

    const payload ={
       
        productId: (parseInt(productId as unknown  as string, 10) || 0) ,
        SizeId: inventory?.size,
         // Solo la fecha, con hora 00:00:00
         type: typeOp,
        quantity: data.cant,
    
    
    
    }


    console.log("payload",payload);
    makePrivateRequest({
      url: '/transaction',
      method:  'POST',
      data:payload
    })
      .then(() => {
        toast.info(`${typeOp} guardado con exito!`)
        reload();
      })
      .catch(() => {
        toast.error(`Error al guardar ${typeOp}!`)
      })
  }

  return (
    <div className="card-inv">
    <div className="card-base product-card-cata">
   
      <div className="card-content">
        <h3 className="product-card-stock">
         {`Talla: ${inventory.size}`}
        </h3>
        
       
        {/* {(product.inventories)? (
//          <p>SI hay tallas Registradas</p>
           <ProductSizes sizes={product.inventories} key={key} /> 
        ):(
          <p>No hay tallas Registradas</p>
        )} */}
        {/* <div>
          {product?.categories?.map(category => (
            <span key={category.id} className="badge rounded-pill bg-dark mr-2">
              {category.name}
            </span>
          ))}

        </div> */}
     
     <h3 className="product-card-stock">
          CANT: {inventory.stock}
        </h3>
        </div>


          {(isLogged) && (<div className="buttons-container-op">
            <button
          type="button"
          className="btn border-radius-10  btn-outline-secondary op-btn "      
          onClick={() => {setOp(true); setTypeOp(TransactionType.Entry)}}
        ><p>ENTRADA</p><img   src={masIcon}  alt="entrada"></img>   
        </button>
        <button
          type="button"
          className="btn border-radius-10  btn-outline-secondary op-btn"      
          onClick={() => {setOp(true);setTypeOp(TransactionType.Exit)}}
        ><p>SALIDA</p><img  src={menosIcon} alt="salida"></img>   
        </button>

        </div> )}


      <div className="buttons-container-inv">

      {(isLogged) && (  <button
          type="button"
          className="btn border-radius-10 btn-product btn-outline-secondary trash-btn "      
          onClick={() => onRemove(inventory)}
        >
                <img  src={deleteIcon} alt="trash"></img>   
        </button>)}
      

      </div>
      </div>
      {(isOp) && (  
           
        <form onSubmit={handleSubmit(onSubmit)} >
           <div className="card-base  product-card-form"> 
      <div className="card-content">
         <h3 className="product-card-stock">
            REGISTRO DE {typeOp}
            </h3>
            </div>
          
    
    <div className="card-content">
      <input     
          type="number"
          className="cant-input form-control "
         defaultValue={1}
          min="1"
          placeholder='cantidad'
       
          {...register(`cant`, { required: 'Campo obligatorio', min: { value: 1, message: 'El valor mínimo es 1' } })}
        />
         {errors.cant && (
                <div className="invalid-feedback d-block">
                  Campo obligatorio!
                </div>
              )}
         </div>       
    <div className="buttons-container-op">
                
                <button
                  type="button"
                  className=" btn  btn-outline-secondary border-radius-10 form-btn"                  
                  onClick={() =>  setOp(false)}
                >
                  <img  src={cancelIcon} alt="no"></img>                     
                </button>  
                         
       <button  type="submit" className="btn btn-outline-primary border-radius-10 form-btn">
       <img  src={acceptIcon} alt="ok"></img>   
       </button>
       </div>
    
     </div>
    </form>
    
  )}
  

    </div>
    

  )
}

export default InventoryCard;