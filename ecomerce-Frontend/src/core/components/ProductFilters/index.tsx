import  SeachIcon  from '../../../core/assets/images/search-icon.svg';
import { Category } from '../../types/Product';
import { makeRequest } from '../../utils/request';
import { SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss'

type Props = {
  name?: string;
  category?: Category;
  handleChangeName: (name: string) => void;
  handleChangeCategory:(category: Category)=>void;
  clearFilters: () => void;
}

const ProductFilters = ({
  name,
  handleChangeName,
  handleChangeCategory,
  clearFilters,
  category
}: Props) => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setIsLoadingCategories(true);
    makeRequest({ url: '/category' })
      .then((response: { data: { content: SetStateAction<Category[]>; }; }) => setCategories(response.data.content))
      .finally(() => setIsLoadingCategories(false));
  }, []);


  return (
    <div className="card-base product-filters-container">
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
        key={`select-${category?.id}`}
        options={categories}
        isLoading={isLoadingCategories}
        getOptionLabel={(option: Category) => option.name}
        getOptionValue={(option: Category) => String(option.id)}
        className="filter-select-container"
        classNamePrefix="product-categories-select"
        placeholder="Categorias..."
        onChange={value => handleChangeCategory(value as Category)}
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