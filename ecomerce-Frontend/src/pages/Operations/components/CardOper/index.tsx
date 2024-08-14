import { Transaction } from "../../../../core/types/Transaction";

import './styles.scss';

type Props = {

  operation: Transaction;
  onRemove: (opId: number) => void;
}

const cardOper = ({  operation, onRemove }: Props) => {
  console.log('salidas',operation);
  const receivedDate = operation.date;
  const parsedDate = new Date(receivedDate);

  // Extraer día, mes y año
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth(); // Los meses en JavaScript van de 0 a 11
  const year = parsedDate.getFullYear();
  
  // Crear un nuevo objeto Date solo con día, mes y año
//  const formattedDate = new Date(year, month, day);
  
  return (
    <div className="card-base border-radius-10 card-item">
      <div className="main-row">
      <div className="col-ini">
          <h2 >Id Producto: {operation.productId}</h2>
          
          <h2 >Talla: {operation.SizeId}</h2>
        </div>
        <div className="col-name">
          <h2 className=""> cant: {operation.quantity}</h2>
        </div>
        <div className="col-name ">
        <h2 className="">{`${day+1}/${month+1}/${year}`}</h2>
        </div>
        
        <div className="buttons-container">    
            <div className="op-button">
              <button
                type="button"
                className="btn btn-outline-primary btn-block border-radius-10"
                onClick={() => onRemove(operation.ID)}
              >
                EXCLUIR
              </button>
            </div>
            </div>
    
         

        

      </div>
    </div>

  )
}

export default cardOper;
