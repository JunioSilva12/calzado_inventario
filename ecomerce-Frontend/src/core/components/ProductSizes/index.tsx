import { Inventory } from '../../types/Product';
import './styles.scss';

type Props ={
  sizes: Inventory[];
  
}


const ProductSizes = ({sizes}:Props) =>{

  console.log('::::',sizes);


    return ( <div>
      Tallas: 

          {sizes.map( size => (
            <span  className="badge rounded-pill bg-primary mx-1">
              {size.size}
            </span>
          ))}

        </div>)

        };

export default ProductSizes