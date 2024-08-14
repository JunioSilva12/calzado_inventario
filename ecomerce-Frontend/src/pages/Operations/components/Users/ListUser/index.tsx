import DefaultFilters from "../../../../../core/components/DefaultFilter";
import Pagination from "../../../../../core/components/Pagination";
import { UserResponse } from "../../../../../core/types/User";
import { makePrivateRequest } from "../../../../../core/utils/request";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardLoader from "../../Inputs/Loaders/ProductCardLoader";
import CardUser from "../CardUser";


const ListUsers = () => {
  const [userResponse, setUserResponse] = useState<UserResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [direction, setDirection] = useState('DESC');
  const [optionValue, setOptionValue] = useState(-1); 

  const handleChangeName = (name: string) => {
    setName(name);
    setActivePage(0);

  }

  const handleChangeDirection = (direction: string) => {
    setDirection(direction);
    setActivePage(0);
    setOptionValue(direction === 'ASC' ? 1 : 0);
  }

  const clearFilters = () => {
    setActivePage(0);
    setDirection('DESC');
    setName('');
    setOptionValue(-1);
  }

  const onRemove = (userId: number) => {
    const confirm = window.confirm('Deseja realmente excluir este usuário?');

    if (confirm) {
      makePrivateRequest({ url: `/user/${userId}`, method: 'DELETE' })
        .then(() => {
          getUsers();
          toast.info('Usuário removido com sucesso!')
        })
        .catch(() => {
          toast.error('Error al remover el usuario')
        })
    }
  }

  const getUsers = useCallback(() => {
    const params = {
      name: name,
      page: activePage,
      linesPerPage: 4,
      direction:  direction,
      orderBy: 'id'
    }
    setIsLoading(true);
    makePrivateRequest({ url: '/user', params })
      .then((response: { data: SetStateAction<UserResponse | undefined>; }) => {setUserResponse(response.data) ; console.log(response)})
      .finally(() => {
        setIsLoading(false);
      })
  }, [activePage, name, direction])

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleCreate = () => {
    history('/admin/users/create');
  }

  return (
    <div className="admin-user-list">
      <div className="filter">
        <button className="btn btn-primary btn-lg" onClick={handleCreate} >
          ADICIONAR
        </button>
        <DefaultFilters
          name={name}
          placeholderText={'usuarios'}
          handleChangeName={handleChangeName}
          clearFilters={clearFilters}
          handleChangeDirection={handleChangeDirection}
          optionValue={optionValue}

        />
      </div>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          userResponse?.content.map(user => (
          
           <CardUser user={user} onRemove={onRemove} key={user.id} />
))
        )}

        {userResponse &&
          <Pagination
            totalPages={userResponse?.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        }
      </div>
    </div>
  );

}

export default ListUsers;
