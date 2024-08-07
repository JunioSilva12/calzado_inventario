const { matchedData } = require('express-validator');
const { sizesModel } = require('../models');
/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');
const {prisma} = require('../config/posgresql');

const getSizeByID = async (req, res) => {
 
    try {
        const size = await prisma.size.findUnique({ where: {id: req.params.id}});
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
        const sizes = await prisma.size.findMany();
      //  console.log(sizes)
       const  sizeResponse ={
            content: sizes,
             totalPages: (sizes.length % 10 == 0)  ?  Math.floor(sizes.length/20)  :   Math.floor(sizes.length / 20) +1
            
          }
          res.json(sizeResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tallas' });
        console.log(error)
    }
};




// Ruta para crear un nuevo producto
 const createSize = async (req, res) => {
    
    try {
       //   console.log('talla...',req.body)
          
          Newsize =req.body 
          Newsize.id=parseInt(Newsize.size, 10)
        const size = await prisma.size.create({data:Newsize});
      
        res.json(size);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear talla' });
        console.log(error)
    }
}


//elimina la talla 
const delateSize =  async (req, res) => {
   
    try {
        
       
        const size = await prisma.size.findUnique({ where: {id: req.params.id}});

        prisma.size.delete({
            where: { id: size.id },
          });

        if (!size) {
            return res.status(404).json(JSON.stringify({ message: 'talla  no encontrada' }));
        }
        await size
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