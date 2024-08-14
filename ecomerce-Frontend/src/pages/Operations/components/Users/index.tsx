import { Route, Routes } from 'react-router-dom';
import FormUser from './FormUser';
import ListUsers from './ListUser';

const Users = () => {
  return (

    <div>
      <Routes>
        <Route path="/" element={<ListUsers />}/>
         
     

        <Route path="/:userId" element={<FormUser />} />
          
        

      </Routes>
    </div>

  );
}

export default Users;