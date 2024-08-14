//import ProductPrice from '../../../../../core/components/ProductPrice';
import { Product } from '../../../../core/types/Product';
//import { Link } from 'react-router-dom';
import './styles.scss';
import ProductSizes from '../../../../core/components/ProductSizes';


type Props = {
  product: Product;
  key:number;
 
}

const Card = ({ product, key }: Props) => {
  
  //console.log('::::',product.inventories);
  return (
    <div className="card-base-op product-card-admin">
      <div className="text-center border-right py-3 border-img">
        <img
          src={`https://qxmmzyiseveolkmgrcts.supabase.co/storage/v1/object/public/productImages/public/${product.imgUrl}`}
          alt={product.name}
          className="product-card-image-admin"
        />
      </div>

      <div className="card-content">
        <h3 className="product-card-name-op">
          {product.name}
        </h3>
       
        {(product.inventories)? (
//          <p>SI hay tallas Registradas</p>
           <ProductSizes  sizes={product.inventories} key={key} /> 
        ):(
          <p>No hay tallas Registradas</p>
        )}
        <div>
          {product?.categories?.map(category => (
            <span key={category.id} className="badge rounded-pill bg-dark mr-2">
              {category.name}
            </span>
          ))}

        </div>
      </div>

    </div>

  )
}

export default Card;