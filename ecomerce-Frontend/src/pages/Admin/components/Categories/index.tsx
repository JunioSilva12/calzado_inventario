import { Route, Routes } from 'react-router-dom';
import FormCategory from './FormCategory';
import ListCategory from './ListCategory';



const Categories = () => {
  console.log("categorias renderizando 1");
  return (

    <div>
      <Routes>
      <Route path="/" element={ <ListCategory />} />
          

        <Route path=":categoryId"  element={<FormCategory/>} />
         

      </Routes>
    </div>

  );
}

export default Categories