//import ProductPrice from '../../../../../core/components/ProductPrice';
import { Product } from '../../../../../core/types/Product';
//import { Link } from 'react-router-dom';
import './styles.scss';
import ProductSizes from '../../../../../core/components/ProductSizes';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  key:number;
  onRemove: (productId: number) => void;
}

const Card = ({ product, key, onRemove }: Props) => {
  
  //console.log('::::',product.inventories);
  return (
    <div className="card-base product-card-admin">
      <div className="text-center border-right py-3 border-img">
        <img
          src={`https://qxmmzyiseveolkmgrcts.supabase.co/storage/v1/object/public/productImages/public/${product.imgUrl}`}
          alt={product.name}
          className="product-card-image-admin"
        />
      </div>

      <div className="card-content">
        <h3 className="product-card-name-admin">
          {product.name}
        </h3>
       
        {(product.inventories)? (
//          <p>SI hay tallas Registradas</p>
           <ProductSizes sizes={product.inventories} key={key} /> 
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

      <div className="buttons-container">
       <Link
          to={`/admin/products/${product.id}`}
          type="button"
          className="btn btn-outline-primary btn-block border-radius-10 btn-product"
        >
          EDITAR
        </Link> 

        <button
          type="button"
          className="btn  btn-block border-radius-10 btn-product btn-outline-secondary"
         
          onClick={() => onRemove(product.id)}
        >
          EXCLUIR
        </button>

      </div>
    </div>

  )
}

export default Card;