
import { Link } from "react-router-dom";
import './styles.scss';
import { Provider } from '../../../../../core/types/provider';


type Props = {
  provider: Provider;
  onRemove: (sizeId: number) => void;
}

const CardCategory = ({ provider, onRemove }: Props) => {
  return (
    <div className="card-base border-radius-10 card-item">
      <div className="main-row">
        <div className="col-name">
          <h2 className="content">Codigo: {provider.idProvider}</h2>
        </div>
        <div className="col-name">
          <h2 className="content">{provider.name}</h2>
        </div>
        <div className="col-name">
          <h2 className="content">Ref: {provider.ref}</h2>
        </div>

        <div className="col-category">
          <div className="row-category-buttons">
            <div className="category-button ml-25">
              <Link
                to={`/admin/providers/${provider.idProvider}`}
                type="button"
                className="btn btn-outline-secondary btn-block border-radius-10 mb-3"
              >
                EDITAR
              </Link>
            </div>
            <div className="category-button">
              <button
                type="button"
                className="btn btn-outline-danger btn-block border-radius-10"
                onClick={() => onRemove(provider.idProvider)}
              >
                EXCLUIR
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>

  )
}

export default CardCategory;
