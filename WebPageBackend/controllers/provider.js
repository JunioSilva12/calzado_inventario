const { matchedData } = require('express-validator');
const { providerModel } = require('../models');
/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');
const {prisma} = require('../config/posgresql');


// Ruta para obtener todos los productos
const getProviders = async (req, res)  => {
    const query = req.query;
    console.log("filters...",query);
    
    const where = {};
    const orderBy = {};

    if (!(query.name == undefined || query.name == "")) {
      where.name =  {
        contains: query.name, // El texto que quieres buscar en el nombre
        mode: 'insensitive', // Opcional: hace que la búsqueda sea insensible a mayúsculas y minúsculas
      };
    }
    if (!(query.direction == undefined || query.direction == "")) {
        orderBy.name = query.direction
      }
   
    



    try {
        const paginationOptions = {};    
          const totalItems = await prisma.provider.count({
            where:where
        });
    
        let totalPages=1;
        if ((query.page) && (query.linesPerPage)) {
            const skip = parseInt(query.page) * parseInt(query.linesPerPage);
            const take = parseInt(query.linesPerPage);
            paginationOptions.skip = skip;
            paginationOptions.take = take;
             // Calcular el total de páginas
         totalPages = Math.ceil(totalItems / take);
        }



        const providers = await prisma.provider.findMany({where:where,orderBy:orderBy,...paginationOptions});
   //     console.log(categories)
       const  providerResponse ={
            content: providers,
             totalPages: totalPages
            
          }
          res.json(providerResponse);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los proveedores' });
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