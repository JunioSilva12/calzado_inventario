import  SeachIcon  from '../../../core/assets/images/search-icon.svg';

import { makeRequest } from '../../utils/request';
import { SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss'
import { Provider } from '../../types/Provider';

type Props = {
  name?: string;
  date?: string;
  provider?: Provider;
  handleChangeName: (name: string) => void;
  handleChangeDate:(date: string)=>void;
  handleChangeProvider:(prov: Provider)=>void;
  clearFilters: () => void;
}

const OperationsFilters = ({
  name,
  handleChangeName,
  handleChangeDate,
  handleChangeProvider,
  clearFilters,
  date,
  provider
}: Props) => {

  

  const [isLoadingProvider, setIsLoadingProvider] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  useEffect(() => {

    
    setIsLoadingProvider(true);

 


   
      makeRequest({ url: '/provider' })
      .then((response: { data: { content: SetStateAction<Provider[]>; }; }) => {
        setProviders(response.data.content)
       // console.log('provs',response.data.content)
      })
      .finally(() => setIsLoadingProvider(false));
     

  }, []);


  return (
    <div className="card-base product-fil-container">
      <div className="input-search">
        <input
          type="text"
          value={name}
          className="form-control"
          placeholder="Buscar Produto"
          onChange={event => handleChangeName(event.target.value)}
        />
         
        <img src={SeachIcon} />


      </div>
      <div className="input-date">
      <input
          type="date"
          value={date}
          className="form-control"
          placeholder="Buscar Produto"
          onChange={event => handleChangeDate(event.target.value)}
        />
         </div>
  

      
      <Select
        name="providers"
        value={provider}
        key={`select-prov-${provider?.idProvider}`}
        options={providers}
        isLoading={isLoadingProvider}
        getOptionLabel={(option: Provider) => ( option.name )}
        getOptionValue={(option: Provider) => String(option.idProvider)}
        className="fil-select-container-prov"
        classNamePrefix="product-prov-select"
        placeholder="proveedor..."
        onChange={value => handleChangeProvider(value as Provider)}
        isClearable
      />
      <button
        className="btn btn-outline-secondary border-radius-10"
        onClick={clearFilters}
      >
        LIMPAR FILTRO
      </button>
    </div>
  )
}

export default OperationsFilters;