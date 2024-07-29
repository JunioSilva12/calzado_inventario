
//import  MainImage from '../../core/assets/images/main-image.svg';
//import ButtonIcon from 'core/components/ButtonIcon/';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ButtonIcon from '../../core/components/ButtonIcon';
import Slider from '../../core/components/Slider';
import {Link} from 'react-router-dom';
import './styles.scss';


const Home = () =>(
  <div className="home-content card-base border-radius-20">

    <div className="home-text">
      <h1 className="text-title">
        Catálogo de Calzado
      </h1>

      
      <Link to="/products" className="startSearchBtn">
        {<ButtonIcon text=" Inicie su busqueda de Calzado " />}
      </Link>

    </div>

    <div className="col-6">
    <Slider data={[]}></Slider>
   


    </div>
  </div>
  
);

export default Home;