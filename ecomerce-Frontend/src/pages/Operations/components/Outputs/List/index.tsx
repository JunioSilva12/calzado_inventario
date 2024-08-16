import { useEffect, useState, useCallback, SetStateAction } from 'react';
import Pagination from '../../../../../core/components/Pagination';

import { makePrivateRequest, makeRequest } from '../../../../../core/utils/request';
import { useNavigate  } from 'react-router-dom';


import CardLoader from '../Loaders/ProductCardLoader';
//import { TransactionResponse } from '../../../../../core/types/Transaction';
import OperationsFilters from '../../../../../core/components/OperationFilters';
import { Provider } from '../../../../../core/types/Provider';
import { TransactionResponse , TransactionType } from '../../../../../core/types/Transaction';
import CardOper from '../../CardOper';
import { toast } from 'react-toastify';



const List = () => {
 // const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [transactionResponse, setTransactionResponse] = useState<TransactionResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useNavigate();

   const [name, setName] = useState('');
   const [date, setDate] = useState('');
   const [provider, setProvider] = useState<Provider>();
  
 const handleChangeName = (name: string) => {
   setActivePage(0);
    setName(name);
  }

 const handleChangeDate = (date: string) => {
    setActivePage(0);
    setDate(date);
 }
   const handleChangeProvider = (prov: Provider) => {
    setActivePage(0);
     setProvider(prov);
   }

   const clearFilters = () => {
     setActivePage(0);
  //   setCategory(undefined);
  setDate('');
     setName('');
     setProvider(undefined);

   }

  const getOutputs = useCallback(() => {
    const params = {
      type:TransactionType.Exit,
      page: activePage,
      linesPerPage: 4,
      name: name,
      provider:provider?.idProvider,
      date:date
    

    }
    setIsLoading(true);
    makeRequest({ url: '/transaction', params })
      .then((response: { data: SetStateAction<TransactionResponse | undefined>; }) => setTransactionResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      
      })
  }, [activePage,date, name,provider]);

  useEffect(() => {
    getOutputs();
  
  }, [getOutputs]);


  const handleCreate = () => {
    history('/operations/outputs/create');
  }

  const onRemove = (opId: number) => {
    const confirm = window.confirm('Desea realmente eliminiar este registro?');
     console.log('opId...',opId);
    if (confirm) {
      makePrivateRequest({ url: `/transaction/${opId}`, method: 'DELETE' })
        .then(() => {
          toast.info('registro removido exitosamente!')
          getOutputs();
        })
        .catch(() => {
          toast.error('Error al remover o registro!')
        })
    }

  }

  return (

    <div className="admin-products-list">
      <div className="filter">
        <button className="btn btn-primary btn-lg " onClick={handleCreate}>
          ADICIONAR
        </button>
       
        
      <OperationsFilters
          name={name}
          date={date}
         
          handleChangeDate={handleChangeDate}
          handleChangeName={handleChangeName}
          clearFilters={clearFilters}
          handleChangeProvider={handleChangeProvider}
          provider={provider}
        />
       

      
      </div>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : 
        (
          transactionResponse && transactionResponse.content ? (
            transactionResponse?.content?.map(operation => (
              <CardOper  operation={operation} onRemove={onRemove} />
            ))
          ) : (
            <div>No registros disponibles</div>
          )
        )}

        {transactionResponse &&
          <Pagination
            totalPages={transactionResponse?.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        }
      </div>
    </div>
  )
}

export default List;