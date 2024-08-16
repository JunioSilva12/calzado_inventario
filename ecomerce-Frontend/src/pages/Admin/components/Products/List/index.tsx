import { useEffect, useState, useCallback, SetStateAction } from 'react';
import Pagination from '../../../../../core/components/Pagination';
import { Category, ProductResponse } from '../../../../../core/types/Product';
import { makePrivateRequest, makeRequest } from '../../../../../core/utils/request';
import { useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/ProductCardLoader';
import ProductFilters from '../../../../../core/components/ProductFilters';
import { Provider } from '../../../../../core/types/Provider';


const List = () => {
  const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>();
  const [provider, setProvider] = useState<Provider>(); 



  const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
  }

  const handleChangeCategory = (category: Category) => {
    setActivePage(0);
    setCategory(category);
  }

  const handleChangeProvider = (prov: Provider) => {
    setActivePage(0);
    setProvider(prov);
  }


  const clearFilters = () => {
    setActivePage(0);
    setCategory(undefined);
    setProvider(undefined);
    setName('');

  }

  const getProducts = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 4,
      name: name,
      categoryId: category?.id,
      provider:provider?.idProvider,

    }
    setIsLoading(true);
    makeRequest({ url: '/product', params })
      .then((response: { data: SetStateAction<ProductResponse | undefined>; }) => setProductResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      
      })
  }, [activePage, name, category,provider]);

  useEffect(() => {
    getProducts();
  
  }, [getProducts]);


  const handleCreate = () => {
    history('/admin/products/create');
  }

  const onRemove = (productId: number, productImgName: string) => {
    const confirm = window.confirm('Desea realmente excluir este produto?');

    if (confirm) {
      makePrivateRequest({ url: `/product/${productId}`, method: 'DELETE' })
        .then(() => {
          toast.info('Produto removido exitosamente!')
          getProducts();
        })
        .catch(() => {
          toast.error('Error al remover o produto!')
        })

        makePrivateRequest({ url: `/product/image/${productImgName}`, method: 'DELETE' })
        .then(() => {
          toast.info('ProdutoImg removido exitosamente!')
          getProducts();
        })
        .catch(() => {
          toast.error('Error al remover Imagen!')
        })
    }

  }

  return (

    <div className="admin-products-list">
      <div className="filter">
        <button className="btn btn-primary btn-lg " onClick={handleCreate}>
          ADICIONAR
        </button>

        <ProductFilters
          name={name}
          category={category}
          provider={provider}
          handleChangeCategory={handleChangeCategory}
          handleChangeName={handleChangeName}
          handleChangeProvider={handleChangeProvider}
          clearFilters={clearFilters}
        />
      </div>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : 
        (
          productResponse && productResponse.content ? (
            productResponse.content.map(product => (
              <Card key={product.id} product={product} onRemove={onRemove} />
            ))
          ) : (
            <div>No products available</div>
          )
        )}

        {productResponse &&
          <Pagination
            totalPages={productResponse?.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        }
      </div>
    </div>
  )
}

export default List;