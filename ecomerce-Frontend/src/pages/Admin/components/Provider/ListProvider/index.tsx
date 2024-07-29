import DefaultFilters from "../../../../../core/components/DefaultFilter";
import Pagination from "../../../../../core/components/Pagination";
import { ProviderResponse } from "../../../../../core/types/provider";
import { makePrivateRequest, makeRequest } from "../../../../../core/utils/request";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardLoader from "../../Products/Loaders/ProductCardLoader";
import CardProvider from "../CardProvider";

const ListProvider = () => {
  console.log("categorias renderizando 2");
  const [providerResponse, setSizeResponse] = useState<ProviderResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useNavigate();
console.log("resultado",providerResponse);
  const [name, setName] = useState('');
  const [direction, setDirection] = useState('DESC');
  const [optionValue, setOptionValue] = useState(-1); 

  const handleChangeName = (name: string) => {
    setName(name);
    setActivePage(0);

  }

  const handleChangeDirection = (direction: string) => {
    setDirection(direction);
    setActivePage(0);
    setOptionValue(direction === 'ASC' ? 1 : 0);
    
  }

  const clearFilters = () => {
    setActivePage(0);
    setDirection('DESC');
    setName('');
    setOptionValue(-1);
  }

  const onRemove = (sizeId: number) => {
    const confirm = window.confirm('Desea realmente quitar esta talla');

    if (confirm) {
      makePrivateRequest({ url: `/provider/${sizeId}`, method: 'DELETE' })
        .then(() => {
          getCategories();
          toast.info('proveedor removida con exito')
        })
        .catch(() => {
          toast.error('error al remover proveedor')
        })
    }

  }

  const getCategories = useCallback(() => {
    const params = {
      name: name,
      page: activePage,
      linesPerPage: 4,
      direction: direction,
      orderBy: 'id'
    }
    setIsLoading(true);
    makeRequest({ url: '/provider', params })
      .then((response: { data: SetStateAction<ProviderResponse | undefined>; }) => setSizeResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      })
  }, [activePage, name, direction])

  useEffect(() => {
    getCategories();
  }, [getCategories]);


  const handleCreate = () => {
    history('/admin/providers/create');
  }

  return (
    <div className="admin-products-list">
      <div className="filter">
        <button className="btn btn-primary btn-lg" onClick={handleCreate} >
          ADICIONAR
        </button>
        <DefaultFilters
          name={name}
          placeholderText={'Proveedores'}
          handleChangeName={handleChangeName}
          clearFilters={clearFilters}
          handleChangeDirection={handleChangeDirection}
          optionValue={optionValue}
        />
      </div>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          providerResponse?.content.map(prov => (
            <CardProvider provider={prov} onRemove={onRemove} key={prov.idProvider} />
          ))
        )}

        {providerResponse &&
          <Pagination
            totalPages={providerResponse?.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        }
      </div>
    </div>
  );
}

export default ListProvider;