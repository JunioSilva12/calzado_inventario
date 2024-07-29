import { Route, Routes } from 'react-router-dom';
import FormProvider from './FormProvider';
import ListProvider from './ListProvider';



const Provider = () => {

  return (

    <div>
      <Routes>
      <Route path="/" element={ <ListProvider />} />
          

        <Route path=":providerId"  element={<FormProvider/>} />
         

      </Routes>
    </div>

  );
}

export default Provider