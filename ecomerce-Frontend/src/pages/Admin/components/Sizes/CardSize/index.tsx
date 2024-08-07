
//import { Link } from "react-router-dom";
import './styles.scss';
import { Size } from "../../../../../core/types/size";

type Props = {
  size: Size;
  onRemove: (sizeId: number) => void;
}

const CardCategory = ({ size, onRemove }: Props) => {
  return (
    <div className="card-base border-radius-10 card-item">
      <div className="main-row">
        <div className="col-name">
          <h2 className="content">{size.size}</h2>
        </div>

        <div className="col-category">
          <div className="row-category-buttons">
           
            <div className="category-button">
              <button
                type="button"
                className="btn btn-outline-danger btn-block border-radius-10"
                onClick={() => onRemove(size.id)}
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
