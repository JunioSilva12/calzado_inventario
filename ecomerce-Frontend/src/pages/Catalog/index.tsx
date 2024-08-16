import { SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Category, ProductResponse } from '../../core/types/Product';
import { makeRequest } from '../../core/utils/request';
import ProductFilters from '../../core/components/ProductFilters';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import './styles.scss';
import Pagination from '../../core/components/Pagination';
import { useCallback } from 'react';
import { Provider } from '../../core/types/Provider';

const Catalog = () => {

  const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
 console.log("pr..",productResponse)
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>();
  const [provider, setProvider] = useState<Provider>();
  const getProducts = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 15,
      name: name,
      provider:provider?.idProvider,
      categoryId: category?.id

    }
    setIsLoading(true);
    console.log("filter...",params);
    makeRequest({ url: '/product', params: params })
      .then((response: { data: SetStateAction<ProductResponse | undefined>; }) => setProductResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      })
  }, [activePage, name, category,provider]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  
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
    setName('');
    setProvider(undefined);

  }

  return (
    <div className="catalog-container">

<div className="catalog-content">
      <div className="filter-container">
        <h1 className="catalog-title">
          Catálogo de Calzado
        </h1>
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
      <div className="catalog-products">
        {isLoading ? <ProductCardLoader /> : (
          productResponse?.content.map(product => ( 
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>

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

export default Catalog;