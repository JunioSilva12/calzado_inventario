/*import { ReactComponent as ArrowIcon } from '@/core/assets/images/arrow.svg';*/
//esta forma de importarlo no es reconocida por TS
import ArrowIcon from '@/core/assets/images/arrow.svg';

import './styles.scss';


type Props ={
  text: string;
}

const ButtonIcon = ({text}:Props) => (
  <div className="default-button">
    <button className="btn btn-primary btn-icon">
      <h5>{text}</h5>
    </button>

    
    <img src={ArrowIcon} className="btn-icon-content"  />
      
    
  </div>
);

export default ButtonIcon;