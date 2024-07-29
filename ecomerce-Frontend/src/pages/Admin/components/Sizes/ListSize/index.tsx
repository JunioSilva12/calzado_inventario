import DefaultFilters from "../../../../../core/components/DefaultFilter";
import Pagination from "../../../../../core/components/Pagination";
import { SizeResponse } from "../../../../../core/types/size";
import { makePrivateRequest, makeRequest } from "../../../../../core/utils/request";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardLoader from "../../Products/Loaders/ProductCardLoader";
import CardSize from "../CardSize";

const ListCategory = () => {
  console.log("categorias renderizando 2");
  const [sizeResponse, setSizeResponse] = useState<SizeResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useNavigate();
console.log("resultado",sizeResponse);
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
      makePrivateRequest({ url: `/size/${sizeId}`, method: 'DELETE' })
        .then(() => {
          getCategories();
          toast.info('talla removida con exito')
        })
        .catch(() => {
          toast.error('error al remover talla')
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
    makeRequest({ url: '/size', params })
      .then((response: { data: SetStateAction<SizeResponse | undefined>; }) => setSizeResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      })
  }, [activePage, name, direction])

  useEffect(() => {
    getCategories();
  }, [getCategories]);


  const handleCreate = () => {
    history('/admin/sizes/create');
  }

  return (
    <div className="admin-products-list">
      <div className="filter">
        <button className="btn btn-primary btn-lg" onClick={handleCreate} >
          ADICIONAR
        </button>
        <DefaultFilters
          name={name}
          placeholderText={'categorias'}
          handleChangeName={handleChangeName}
          clearFilters={clearFilters}
          handleChangeDirection={handleChangeDirection}
          optionValue={optionValue}
        />
      </div>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          sizeResponse?.content.map(size => (
            <CardSize size={size} onRemove={onRemove} key={size.id} />
          ))
        )}

        {sizeResponse &&
          <Pagination
            totalPages={sizeResponse?.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        }
      </div>
    </div>
  );
}

export default ListCategory;