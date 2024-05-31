import { Route, Routes } from 'react-router-dom';
import FormCategory from './FormCategory';
import ListCategory from './ListCategory';



const Categories = () => {
  return (

    <div>
      <Routes>
      <Route path="/admin/categories" >
          <ListCategory />
        </Route>

        <Route path="/admin/categories/:categoryId">
          <FormCategory/>
        </Route>

      </Routes>
    </div>

  );
}

export default Categories