import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss'

type Props ={
  title: string;
  children: React.ReactNode;
}

const BaseForm = ({title, children }: Props) =>{
  const history = useNavigate();

  const handleCancel = () =>{
    history('../');
  }

  return (
    <div className="op-base-form card-base">
      <h1 className="base-form-title">
        {title}
      </h1>
      {children}
      <div className="base-form-actions">
        <button 
          type="button" 
          className="btn btn-outline-danger border-radius-10 mr-3"
          onClick={handleCancel}
        >
          CANCELAR
        </button>

        <button className="btn btn-primary border-radius-10">
          GUARDAR
        </button>

     
        
      </div>
    </div>
  )
}

export default BaseForm;