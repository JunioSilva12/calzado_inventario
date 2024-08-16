import { Link } from "react-router-dom";
import './styles.scss';
import { Provider } from '../../../../../core/types/Provider'
import deleteIcon from '/src/core/assets/images/delete-icon.svg';
import editIcon from '/src/core/assets/images/edit-icon.svg';
type Props = {
  provider: Provider;
  onRemove: (sizeId: number) => void;
}

const CardCategory = ({ provider, onRemove }: Props) => {
  return (
    <div className="card-base border-radius-10 card-item">
      <div className="main-row">
        <div className="col-ini-provider">
          <h2 className="content">Cod: {provider.idProvider}</h2>
          <h2 className="content">Ref: {provider.ref}</h2>

        </div>
        <div className="col-name">
          <h2 className="content">{provider.name}</h2>
        </div>
       

        <div className="col-category">
          
            <div className="category-button">
              <Link
                to={`/admin/providers/${provider.idProvider}`}
                type="button"
                className="btn btn-outline-secondary btn-block border-radius-10  trash-btn"
              >
                  <img  src={editIcon} alt="editar"></img>
              </Link>
            </div>
            <div className="category-button">
              <button
                type="button"
                className="btn btn-outline-danger btn-block border-radius-10  trash-btn" 
                onClick={() => onRemove(provider.idProvider)}
              >
                <img  src={deleteIcon} alt="trash"></img>
              </button>
            
          </div>

        </div>

      </div>
    </div>

  )
}

export default CardCategory;
