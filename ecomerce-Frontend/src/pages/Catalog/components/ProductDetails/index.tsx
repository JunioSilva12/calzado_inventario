import { SetStateAction, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import  ArrowIcon  from '../../../../core/assets/images/arrow.svg';
//import ProductPrice from '../../../../core/components/ProductPrice';
import { Inventory, Product } from '../../../../core/types/Product';
import { makePrivateRequest, makeRequest } from '../../../../core/utils/request';
import ProductInfoLoader from '../Loaders/ContentLoade';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';
import './styles.scss';
import CardLoader from '../../../Admin/components/Products/Loaders/ProductCardLoader';
import InventoryCard from '../InventoryCard';
import { toast } from 'react-toastify';
import InventoryForm from '../InventoryForm';
import { isTokenValid } from '../../../../core/utils/auth';


type ParamsType = {
  productId: string;
}

const ProductDetails = () => {

  const { productId  } = useParams<ParamsType>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [iscrating, setCreating] = useState(false);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    getProduct()
    const isLogged = isTokenValid();
    console.log("la data..",isLogged);
    if (isLogged) {
      setLogged(true);
    }
  
  }, []);

const getProduct = () => {
  
    setIsLoading(true);
    makeRequest({ url: `/product/${productId}` })
      .then((response: { data: SetStateAction<Product | undefined>; }) => setProduct(response.data))
      .finally(() => setIsLoading(false));

  
}
  const onRemove = (inventory: Inventory) => {
    const confirm = window.confirm('SEFURO DESAS QUITAR ESTA TALLA DEL INVENTARIO?');

    if (confirm) {
      makePrivateRequest({ url: `/inventory/${productId}`, method: 'DELETE', data:inventory})
        .then(() => {
          toast.info('TALLA QUITADA EXITOSAMENTE!')
           getProduct();
        })
        .catch(() => {
          toast.error('Error al remover talla!')
        })
    }

  }


  const handleCreate = () => {
    setCreating(true);
  }

  return (
    <div className="product-details-container">
      <div className="card-base border-radius-20 product-details">
        <Link to="/products" className="product-details-goback">
          <div className="icon-goback">
           <img src={ArrowIcon} />
          </div>
          
          <h1 className="text-goback">Volver</h1>
        </Link>
        <div className="product-details-info">


          {isLoading ? <ProductInfoLoader /> : (
            <div className="image-price">
              <div className="product-details-card text-center">
                <img className='img-product' src={`https://qxmmzyiseveolkmgrcts.supabase.co/storage/v1/object/public/productImages/public/${product?.imgUrl}`} alt={product?.name}
                  />
              </div>
              <div className="product-info-fields">
                <h1 className="product-details-name">
                  {product?.name}
                </h1>

                {/* {product?.price && <ProductPrice price={product?.price} />} */}
              </div>
            </div>
          )}


          <div className="product-details-card">
            {isLoading ? <ProductDescriptionLoader /> : (
              <>
              <div className="header-size">
                <h1 className="product-description-title">
                  Inventarios del producto              
                </h1>
                {(isLogged) && (  <button className="btn btn-primary " onClick={handleCreate} >
                ADICIONAR
               </button>)}

               </div>
               {iscrating ? 
               <InventoryForm  setCreating={setCreating} productSizes={product?.inventories} reload={getProduct} />
               : <div></div> }


                {isLoading ? <CardLoader /> : (
          product?.inventories?.map(inv => (
            (inv.stock !== 0) && ( <InventoryCard inventory={inv} onRemove={onRemove} key={inv.size} />)
          ))
        )}


               
              </>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

export default ProductDetails;