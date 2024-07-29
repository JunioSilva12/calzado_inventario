const { matchedData } = require('express-validator');
const { sizesModel } = require('../models');
/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');


const getSizeByID = async (req, res) => {
 
    try {
        const size = await sizesModel.findByPk(req.params.id);
        if (!size) {
            return res.status(404).json({ message: 'talla  no encontrado' });
        }
        res.json(size);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener talla' });
    }
};

// Ruta para obtener todos los productos
const getSizes = async (req, res)  => {
    try {
        const sizes = await sizesModel.findAll();
   //     console.log(categories)
       const  sizeResponse ={
            content: sizes,
             totalPages: (sizes.length % 10 == 0)  ?  Math.floor(sizes.length/20)  :   Math.floor(sizes.length / 20) +1
            
          }
          res.json(sizeResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tallas' });
    }
};




// Ruta para crear un nuevo producto
 const createSize = async (req, res) => {
    
    try {
          console.log('talla...',req.body)
          Newsize =req.body 
          Newsize.id=Newsize.size
        const size = await sizesModel.create(Newsize);
      
        res.json(size);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear talla' });
    }
}


//elimina la talla 
const delateSize =  async (req, res) => {
   
    try {
        
     
        const size = await sizesModel.findByPk(req.params.id);

        if (!size) {
            return res.status(404).json(JSON.stringify({ message: 'talla  no encontrada' }));
        }
        await size.destroy();
        res.json(JSON.stringify({ message: 'Talla eliminado correctamente' }));
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar Talla' });
    }

}





module.exports = {
    createSize ,
     delateSize,
     getSizes,
     getSizeByID
}