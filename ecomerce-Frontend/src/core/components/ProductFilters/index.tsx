import  SeachIcon  from '../../../core/assets/images/search-icon.svg';
import { Category } from '../../types/Product';
import { makeRequest } from '../../utils/request';
import { SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss'
import { Provider } from '../../types/Provider';

type Props = {
  name?: string;
  category?: Category;
  provider?: Provider;
  handleChangeName: (name: string) => void;
  handleChangeCategory:(category: Category)=>void;
  handleChangeProvider:(prov: Provider)=>void;
  clearFilters: () => void;
}

const ProductFilters = ({
  name,
  handleChangeName,
  handleChangeCategory,
  handleChangeProvider,
  clearFilters,
  category,
  provider
}: Props) => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isLoadingProvider, setIsLoadingProvider] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  useEffect(() => {

    setIsLoadingCategories(true);
    setIsLoadingProvider(true);

 
    makeRequest({ url: '/category' })
      .then((response: { data: { content: SetStateAction<Category[]>; }; }) => {
        setCategories(response.data.content);
        console.log('cat',response.data.content)
      
      })
      .finally(() => setIsLoadingCategories(false));

   
      makeRequest({ url: '/provider' })
      .then((response: { data: { content: SetStateAction<Provider[]>; }; }) => {
        setProviders(response.data.content)
        console.log('provs',response.data.content)
      })
      .finally(() => setIsLoadingProvider(false));
     

  }, []);


  return (
    <div className="card-base product-fil-container ">
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
      <Select
        name="categories"
        value={category}
        key={`select-cat-${category?.id}`}
        options={categories}
        isLoading={isLoadingCategories}
        getOptionLabel={(option: Category) => option.name}
        getOptionValue={(option: Category) => String(option.id)}
        className="fil-select-container-cat"
        classNamePrefix="product-cat-select"
        placeholder="categoria..."
        onChange={value => handleChangeCategory(value as Category)}
        isClearable
      />
      
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

export default ProductFilters;