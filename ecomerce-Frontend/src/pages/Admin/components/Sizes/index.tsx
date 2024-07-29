import { Route, Routes } from 'react-router-dom';
import FormSize from './FormSize';
import ListSize from './ListSize';



const Sizes = () => {

  return (

    <div>
      <Routes>
      <Route path="/" element={ <ListSize />} />
          

        <Route path=":sizeId"  element={<FormSize/>} />
         

      </Routes>
    </div>

  );
}

export default Sizes