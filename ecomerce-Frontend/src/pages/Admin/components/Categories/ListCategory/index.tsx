import DefaultFilters from "../../../../../core/components/DefaultFilter";
import Pagination from "../../../../../core/components/Pagination";
import { CategoryResponse } from "../../../../../core/types/Category";
import { makePrivateRequest, makeRequest } from "../../../../../core/utils/request";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardLoader from "../../Products/Loaders/ProductCardLoader";
import CardCategory from "../CardCategory";

const ListCategory = () => {
  console.log("categorias renderizando 2");
  const [categoryResponse, setCategoryResponse] = useState<CategoryResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useNavigate();
console.log("resultado",categoryResponse);
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

  const onRemove = (categoryId: number) => {
    const confirm = window.confirm('Desea realmente excluir este produto?');

    if (confirm) {
      makePrivateRequest({ url: `/categories/${categoryId}`, method: 'DELETE' })
        .then(() => {
          getCategories();
          toast.info('Produto removido com sucesso!')
        })
        .catch(() => {
          toast.error('Erro ao remover o produto!')
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
    makeRequest({ url: '/category', params })
      .then((response: { data: SetStateAction<CategoryResponse | undefined>; }) => setCategoryResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      })
  }, [activePage, name, direction])

  useEffect(() => {
    getCategories();
  }, [getCategories]);


  const handleCreate = () => {
    history('/admin/categories/create');
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
          categoryResponse?.content.map(category => (
            <CardCategory category={category} onRemove={onRemove} key={category.id} />
          ))
        )}

        {categoryResponse &&
          <Pagination
            totalPages={categoryResponse?.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        }
      </div>
    </div>
  );
}

export default ListCategory;