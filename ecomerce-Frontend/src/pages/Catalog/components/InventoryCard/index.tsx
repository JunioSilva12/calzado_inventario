//import ProductPrice from '../../../../../core/components/ProductPrice';
import { useEffect, useState } from 'react';
import { Inventory } from '../../../../core/types/Product';
//import { Link } from 'react-router-dom';
import './styles.scss';
import { isTokenValid } from '../../../../core/utils/auth';

//import { Link } from 'react-router-dom';

type Props = {
  inventory: Inventory;
  key:number;
  onRemove: (inventory: Inventory) => void;
}

const InventoryCard = ({ inventory, onRemove }: Props) => {
  
  const [isLogged, setLogged] = useState(false);


  useEffect(() => {
   
    const isLogged = isTokenValid();
    console.log("la data..",isLogged);
    if (isLogged) {
      setLogged(true);
    }
  
  }, []);
  //console.log('::::',product.inventories);
  return (
    <div className="card-base product-card-cata">
   
      <div className="card-content">
        <h3 className="product-card-stock">
         {`TALLA: ${inventory.size}`}
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
      </div>
      <div className="card-content">
        <h3 className="product-card-stock">
          CANT: {inventory.stock}
        </h3>
        </div>
      <div className="buttons-container-inv">
       

      {(isLogged) && (  <button
          type="button"
          className="btn  btn-block border-radius-10  btn-outline-secondary"
         
          onClick={() => onRemove(inventory)}
        >
          EXCLUIR
        </button>)}

      </div>
    </div>

  )
}

export default InventoryCard;