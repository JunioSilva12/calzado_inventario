
import List from './List';
import { Route, Routes } from 'react-router-dom';
import Form from './Form';

const Outputs = () => {
  console.log("entradas renderizando");
  return (
    <div>
      <Routes>
        <Route path="/"  element={<List />} />
     
              
         {<Route path="/:inputId"  element={<Form />} />  }  
        { /*aqui anda el create tambien */}
         

      </Routes>
    </div>
  )
}

export default Outputs;