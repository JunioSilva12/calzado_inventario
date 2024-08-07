const { matchedData } = require('express-validator');
const { providerModel } = require('../models');
/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');
const {prisma} = require('../config/posgresql');


// Ruta para obtener todos los productos
const getProviders = async (req, res)  => {
    try {
        const sizes = await prisma.provider.findMany();
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
        const prov = await prisma.provider.findUnique({ where:{ idProvider:parseInt(req.params.id , 10)} });
        if (!prov) {
            return res.status(404).json({ message: 'proveedor  no encontrado' });
        }
        res.json(prov);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener proveedor' });
    }
};

const updateProvider = async (req, res) => {
   
    try {
        
        const { id } = req.params;
        const { cod , name , ref} = req.body;
       
        const prov = await prisma.provider.findUnique({ where: {idProvider: parseInt(req.params.id , 10)}});

         await prisma.provider.update({
            where:{ idProvider:parseInt(req.params.id , 10)},
            data: {
              name,
              ref,
             // updatedAt: new Date(), // Actualiza el campo updatedAt manualmente
            },
          });
       
        if (!prov) {
            return res.status(404).json({ mensaje: 'proveedor no encontrado' });
        }else{
        
       
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
            idProvider:parseInt(prov.cod, 10) ,
            name:prov.name ,
            ref: prov.ref
    }
        
        const resul = await prisma.provider.create({data:newProv});
      
        res.json(resul);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear prooveedor' });
        console.log(error);
    }
}


//elimina la talla 
const delateProvider =  async (req, res) => {
   
    try {
        
     
        const prov = await prisma.provider.findUnique({ where: { idProvider:parseInt(req.params.id , 10)}});

        if (!prov) {
            return res.status(404).json(JSON.stringify({ message: 'Proveedor  no encontrado' }));
        }
        await    prisma.provider.delete({
            where: { idProvider: prov.idProvider },
          });
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