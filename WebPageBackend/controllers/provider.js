const { matchedData } = require('express-validator');
const { providerModel } = require('../models');
/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');



// Ruta para obtener todos los productos
const getProviders = async (req, res)  => {
    try {
        const sizes = await providerModel.findAll();
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


const getProviderByID = async (req, res) => {
 
    try {
        const prov = await providerModel.findByPk(req.params.id);
        if (!prov) {
            return res.status(404).json({ message: 'proveedor  no encontrado' });
        }
        res.json(prov);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedor' });
    }
};

const updateProvider = async (req, res) => {
   
    try {
        
        const { id } = req.params;
        const { cod , name , ref} = req.body;
       
         prov = await providerModel.findByPk(id);

       
        if (!prov) {
            return res.status(404).json({ mensaje: 'proveedor no encontrado' });
        }else{
        
         prov.ref = ref;
         prov.idProvider = cod;
         prov.name = name;

          await  prov.save();
        return res.json(prov);
        }
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en cambiar proveedor', 500)
    }

}



// Ruta para crear un nuevo producto
 const createProvider = async (req, res) => {
    
    try {
          console.log('prov...',req.body)
         const prov =req.body 

          const newProv = {
            idProvider: prov.cod,
            name:prov.name ,
            ref: prov.ref
    }
        
        const size = await providerModel.create(newProv);
      
        res.json(size);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear prooveedor' });
    }
}


//elimina la talla 
const delateProvider =  async (req, res) => {
   
    try {
        
     
        const size = await providerModel.findByPk(req.params.id);

        if (!size) {
            return res.status(404).json(JSON.stringify({ message: 'Proveedor  no encontrado' }));
        }
        await size.destroy();
        res.json(JSON.stringify({ message: 'Proveedor eliminado correctamente' }));
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar proveedor' });
    }

}



module.exports = {
    createProvider ,
     delateProvider,
     getProviders,
     updateProvider,
     getProviderByID

}