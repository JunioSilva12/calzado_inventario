

//import ProductPrice from '../../../../core/components/ProductPrice';
import ProductSizes from '../../../../core/components/ProductSizes';
import { Product } from '../../../../core/types/Product';
//import ProductImage from '../../../../core/assets/images/product.svg'
import './styles.scss';

type Props ={
  product: Product;
 
}


/*

interface SVGImageProps {
    url: string;
}
/*
const SVGImage: React.FC<SVGImageProps> = ({ url }) => {
    return (
        <div>
            <img src={url} alt="Imagen SVG" />
        </div>
    );
};
/*
const getImgProduct = (url:string ) : string =>{
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ProductImage = require('../../../../core/assets/images/'+url);
    console.log("la img es:"+ProductImage)
    return ProductImage;
} catch (error) {
    console.error(`Error al cargar la imagen: ${error}`);
    return ''; // Devuelve una cadena vacía en caso de error
}
}

*/

const ProductCard = ({ product }: Props) =>(
  
  <div className="card-base border-radius-10 product-card">
    <img src={`https://qxmmzyiseveolkmgrcts.supabase.co/storage/v1/object/public/productImages/public/${product.imgUrl}`} alt={product.name} className="product-card-image"/>
   
    <div className="product-info">
      <h6 className="product-name">
        {product.name}
      </h6>
      
      {(product.inventories)? (
//          <p>SI hay tallas Registradas</p>
           <ProductSizes sizes={product.inventories} key={product.id} /> 
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
   {/* <ProductPrice price={product.price}/> */}
  </div>
);

export default ProductCard;