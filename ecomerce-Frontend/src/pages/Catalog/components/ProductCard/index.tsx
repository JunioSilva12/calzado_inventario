

//import ProductPrice from '../../../../core/components/ProductPrice';
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
    <img src={`/src/core/assets/images/${product.imgUrl}`} alt={product.name} className="product-card-image"/>
   
    <div className="product-info">
      <h6 className="product-name">
        {product.name}
      </h6>
    </div>
   {/* <ProductPrice price={product.price}/> */}
  </div>
);

export default ProductCard;