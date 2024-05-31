const { matchedData } = require('express-validator');
const { categoryModel } = require('../models');
/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');



// Ruta para obtener todos los productos
const getCategories = async (req, res)  => {
    try {
        const categories = await categoryModel.findAll();
   //     console.log(categories)
       const  categoryResponse ={
            content: categories
           // totalPages: (products.length % 10 == 0)  ?  Math.floor(products.length/20)  :   Math.floor(products.length / 20) +1
            
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
        const category = await categoryModel.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Ruta para crear un nuevo producto
 const createCategory = async (req, res) => {
    
    try {
        const {  ...rest } = matchedData(req)
        const category = await categoryModel.create({  ...rest });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
}

const updateCategory = async (req, res) => {
   
    try {
        
        const { id , ...res} = matchedData(req)
       
        let category = await categoryModel.findByPk(id);
        if (!category) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }else{
        await categoryModel.update(rest, { where: { id } })
        return res.send({ data })
        }
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en pruducto/updateItem', 500)
    }

}

const delateCategory =  async (req, res) => {
   
    try {
        
        const { id , ...res} = matchedData(req)
        const product = await categoryModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json(JSON.stringify({ message: 'Producto no encontrado' }));
        }
        await product.destroy();
        res.json(JSON.stringify({ message: 'Producto eliminado correctamente' }));
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }

}



module.exports = {
    createCategory ,
     delateCategory,
     updateCategory,
     getCategoriesByID,
     getCategories
}