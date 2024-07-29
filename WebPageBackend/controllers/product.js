const { matchedData } = require('express-validator');
const { productModel,InventoryModel,categoryModel,productXcategoryModel } = require('../models');
/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');


/*
const getProductxCategory = async (id) => {
    try {
        const categories = await productXcategoryModel.findAll({where:{ productId: id } }); // Busca la categoría por su IDproducto
       // console.log(".cc.",categories);
        
        //return categories
        
        console.log(categories);
        const categoriesID = categories.map((categorie) => ({
            id:categorie.dataValues.categoryId
            //name: categoryModel.findAll({where:{ id: categorie.categoryId }  })
        
          }))
         // console.log(".dd.",categoriesID);
         const categoriesNames=  await categoriesID.map( (cat) => (
            console.log(cat.id),
            
                
             cat.id
        
          ))
         //  console.log(".names.",categoriesNames);
           names=[]
            categoriesNames.forEach( async id => {
            console.log("es:",id)
            cat=await categoryModel.findByPk(id) 
           names.push( {id :cat.dataValues.id,name :cat.dataValues.name } )
           });
          // console.log("est..",  await categoryModel.findByPk(101))
           console.log("n..",names)

        
        
       
        return names; // Devuelve el nombre de la categoría
        //return res.send({ data, user })
      } catch (error) {
        console.error('Error al buscar la categoría:', error.message);
        return ['Error al buscar la categoría'];
      }
  };*/



// Ruta para obtener todos los productos
const getProducts = async (req, res)  => {
    try {
         products = await productModel.findAll( {
            include: [
              {
                model: categoryModel

              }
             ] // Incluye las categorías relacionadas que pendejo soyyyyyyyyyyyyyyyyyyyyy
          });

         


        console.log(".a.",products);

        
        const updatedProducts = await Promise.all(
          products.map(async (product) => {
            const inventories = await InventoryModel.findAll({
              where: {
                productId: product.id,
              },
            });
    
            return {
              id: product.id,
              name: product.name,
              idProvider: product.idProvider,
              inventories: inventories?.map((inv) => ({
                size: inv.dataValues.SizeId,
                stock: inv.dataValues.stock,
              })),
              imgUrl: product.imgUrl,
              updatedAt: product.updatedAt,
              createdAt: product.createdAt,
              categories: product.categories.map((cat) => ({
                id: cat.id,
                name: cat.name,
              })),
            };
          })
        );
          
         
            console.log(".productos.",updatedProducts)
            const  ProductResponse ={
            content: updatedProducts,
            totalPages: (products.length % 10 == 0)  ?  Math.floor(products.length/20)  :   Math.floor(products.length / 20) +1
            
          }
           res.json(ProductResponse);
         
    
   
        
       
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Ruta para obtener un producto por su ID
const getProductByID = async (req, res) => {
  //  const { id } = matchedData(req)
  const id = req.params.id
    try {
        const product = await productModel.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Ruta para crear un nuevo producto
 const crearProducto = async (req, res) => {
    
    try {
        const {  ...rest } = matchedData(req)
        console.log("el producto..",req.body)
        product=req.body;

       const ProductResponse = await productModel.create({
      name: product.name,
      idProvider: product.provider.idProvider,
      price: product.price,
      imgUrl: product.imgUrl,
    });
    console.log("..........",ProductResponse)
    console.log("..........",product.categories[0].id)

    product.categories.forEach(async cat => {

    try {
      const category = await categoryModel.findOne({ where: { id: cat.id } });
             console.log("id-cat:",category)
             if (category) {
                await productXcategoryModel.create({productId :ProductResponse.dataValues.id  , categoryId:category.dataValues.id });
                console.log('Producto asociado a la categoría ');
              } else {
                console.log('La categoría no existe.');
              }
     } catch (error) {
      console.log("cat-err",error)
     }  


  });
  product.inventories.forEach(async inv => {

    try {
      
                await InventoryModel.create({productId :ProductResponse.dataValues.id  , SizeId:inv.size,  stock:inv.stock});
                console.log('Producto asociado a la talla ');
             
     } catch (error) {
      console.log("cat-err",error)
     }  


  });
      
    
  

            
             
        
    

    res.json(ProductResponse);
  } catch (error) {
    console.error('Error al crear el producto:', error.message);
  }
   
}

const updateProduct = async (req, res) => {
   
    try {
        
       // const { id , ...res} = matchedData(req)
       console.log("up..",req.body)
       const productNew=req.body;
       const id = req.params.id

        let product = await productModel.findByPk(id);
        console.log("new..",productNew)
        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }else{
        await productModel.update({ name:productNew.name , price:productNew.price }, { where: { id } })
        console.log("..........",product)
        console.log("..........",productNew.categories[0].id)
     try {
      const category = await categoryModel.findOne({ where: { id: productNew.categories[0].id } });
             console.log("id-cat:",category)
             if (category) {
                await productXcategoryModel.create({productId :product.dataValues.id  , categoryId:category.dataValues.id });
                console.log('Producto asociado a la categoría ');
              } else {
                console.log('La categoría no existe.');
              }
     } catch (error) {
      console.log("cat-err",error)
     }      
        return res.send({ productNew })
        }
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en pruducto/updateItem', 500)
    }

}

const delateProduct =  async (req, res) => {
   
    try {
        
   //     const { id , ...res} = matchedData(req)
        const product = await productModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await product.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }

}



module.exports = {
     crearProducto ,
     updateProduct,
     getProductByID,
     getProducts,
     delateProduct
     
}