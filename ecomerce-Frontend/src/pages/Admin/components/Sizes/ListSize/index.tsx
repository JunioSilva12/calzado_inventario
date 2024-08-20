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
  const history = useNavigate();
console.log("resultado",sizeResponse);






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
     
     
    
     
      orderBy: 'id'
    }
    setIsLoading(true);
    makeRequest({ url: '/size', params })
      .then((response: { data: SetStateAction<SizeResponse | undefined>; }) => setSizeResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

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
     
      </div>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          sizeResponse?.content.map(size => (
            <CardSize size={size} onRemove={onRemove} key={size.id} />
          ))
        )}

       
      </div>
    </div>
  );
}

export default ListCategory;