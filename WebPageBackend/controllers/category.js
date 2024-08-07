const { matchedData } = require('express-validator');

/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');
const {prisma} = require('../config/posgresql');


// Ruta para obtener todos los productos
const getCategories = async (req, res)  => {
    try {
        const categories = await prisma.category.findMany();
   //     console.log(categories)
       const  categoryResponse ={
            content: categories,
             totalPages: (categories.length % 10 == 0)  ?  Math.floor(categories.length/20)  :   Math.floor(categories.length / 20) +1
            
          }
           res.json(categoryResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorias' });
    }
};

// Ruta para obtener un producto por su ID
const getCategoriesByID = async (req, res) => {
    const { id } = matchedData(req)
    try {
        const category = await prisma.category.findUnique({ where: {id: id}});
        if (!category) {
            return res.status(404).json({ message: 'categoria no encontrado' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categoria' });
    }
};

// Ruta para crear un nuevo producto
 const createCategory = async (req, res) => {
    
    try {
        
        const category = await prisma.category.create({data:req.body});
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear categoria' });
    }
}

const updateCategory = async (req, res) => {
   
    try {
        
        const { id , ...res} = matchedData(req)
       
        let category = await prisma.category.findUnique({ where: {id: id}});
        if (!category) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }else{
        await prisma.category.update( {where: { id: category.id  },
            data: {
                ...res,
              updatedAt: new Date(), // Actualiza el campo updatedAt manualmente
            }, })
        return res.send({ data })
        }
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en pruducto/updateItem', 500)
    }

}

const delateCategory =  async (req, res) => {
   
    try {
        
    
       // console.log('...cat..',req.params.id)
      const cat = await prisma.category.findUnique({ where: {id:  parseInt(req.params.id, 10)}});
        if (!cat) {
            return res.status(404).json(JSON.stringify({ message: 'categoria no encontrada' }));
        }
        await  prisma.category.delete({
            where: { id: parseInt(cat.id, 10) },
          });
        res.json(JSON.stringify({ message: 'categoria eliminado correctamente' }));
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar categoria' });
        console.log(error)
    }

}



module.exports = {
    createCategory ,
     delateCategory,
     updateCategory,
     getCategoriesByID,
     getCategories
}