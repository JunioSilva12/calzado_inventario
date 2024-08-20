import { Inventory } from '../../types/Product';
import './styles.scss';

type Props ={
  sizes: Inventory[];
  
}


const ProductSizes = ({sizes}:Props) =>{

  console.log('::::',sizes);


    return ( <div style={{ display: 'flexbox', width:'80%',  overflow: "hidden"}}>
      Tallas: 

          {sizes.map( size => (
            <div>
            <span  className="badge rounded-pill bg-primary mx-1">
              {size.size}             
            </span>
             {size.stock} unidades!
             </div>
          ))}

        </div>)

        };

export default ProductSizes