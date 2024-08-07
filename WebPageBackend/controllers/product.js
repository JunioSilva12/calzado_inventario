const { matchedData } = require('express-validator');
const { productModel,InventoryModel,categoryModel,productXcategoryModel } = require('../models');
/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');
const {prisma} = require('../config/posgresql');

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
         products = await prisma.product.findMany( {
          include: {
            categories: {
              include: {
                category: true,
              }
            }
           } // Incluye las categorías relacionadas que pendejo soyyyyyyyyyyyyyyyyyyyyy
          });

        

      //  console.log(".a.",products[0].categories);

        
        const updatedProducts = await Promise.all(
          products.map(async (product) => {
            const inventories = await prisma.inventory.findMany({
              where: {
                productId: product.id,
              },
              
            });
           
    
            return {
              id: product.id,
              name: product.name,
              idProvider: product.idProvider,
              inventories: inventories?.map((inv) => ({
                size: inv.SizeId,
                stock: inv.stock,
              })),
              imgUrl: product.imgUrl,
              categories:product.categories.map( (cat) => (cat.category)),
              updatedAt: product.updatedAt,
              createdAt: product.createdAt,

            };
          })
        );
          
         
         //   console.log(".productos.",updatedProducts[0])
            const  ProductResponse ={
            content: updatedProducts,
            totalPages: (products.length % 10 == 0)  ?  Math.floor(products.length/20)  :   Math.floor(products.length / 20) +1
            
          }
           res.json(ProductResponse);
         
    
   
        
       
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    //    console.log('error....',error)
    }
};

// Ruta para obtener un producto por su ID
const getProductByID = async (req, res) => {
  //  const { id } = matchedData(req)
  const id = req.params.id
    try {
        const product = await prisma.product.findUnique({ 
          where:{ id:parseInt(id , 10)},
          include: {
            categories: {
              include: {
                category: true,
              }
            }

           }
        });
        fullProduct={}
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
            
        }

         
              const inventories = await prisma.inventory.findMany({
                where: {
                  productId: product.id,
                },
                
              });
              const provider = await prisma.provider.findUnique({
                where: {
                  idProvider: product.idProvider,
                },
                
              });
             
      
              fullProduct = {
                id: product.id,
                name: product.name,
                provider:provider,
                inventories: inventories?.map((inv) => ({
                  size: inv.SizeId,
                  stock: inv.stock,
                })),
                imgUrl: product.imgUrl,
                categories:product.categories.map( (cat) => (cat.category)),
                updatedAt: product.updatedAt,
                createdAt: product.createdAt,
  
              };
          
         




        









        res.json(fullProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
        console.log('error-productbyid',error);
    }
};

// Ruta para crear un nuevo producto
 const crearProducto = async (req, res) => {
    
    try {
        const {  ...rest } = matchedData(req)
        console.log("el producto..",req.body)
        product=req.body;

       const ProductResponse = await prisma.product.create({
   data:{   name: product.name,
      idProvider: product.provider.idProvider,
      price: product.price,
      imgUrl: product.imgUrl}
    });
    console.log("..........",ProductResponse)
    console.log("..........",product.categories[0].id)

    product.categories.forEach(async cat => {

    try {
      const category = await prisma.category.findUnique({ where: { id: cat.id } });
             console.log("id-cat:",category)
             if (category) {
                await prisma.productxCategory.create({data:{productId :ProductResponse.id  , categoryId:category.id }});
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
      
                await prisma.inventory.create({data:{productId :ProductResponse.id  , SizeId:inv.size,  stock:parseInt(inv.stock, 10)}});
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

       const product = await prisma.product.findUnique({ where: {id: parseInt(req.params.id , 10)}});

    

        console.log("new..",productNew)
        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }else{

          await prisma.product.update({
            where:{ id:parseInt(req.params.id , 10)},
            data: { 
              name:productNew.name , 
              idProvider:productNew.provider.idProvider,
              imgUrl:productNew.imgUrl

             },
          });


      
        console.log("..........",product)
        console.log("..........",productNew.categories[0].id)
        await prisma.productxCategory.deleteMany({ where: { productId:parseInt(req.params.id , 10)} });
       await productNew.categories.forEach(async cat => {

       
        const category = await prisma.category.findUnique({ where: { id: cat.id } });
               console.log("id-cat:",category)
               if (category) {
                  await prisma.productxCategory.create({data:{productId :parseInt(req.params.id , 10)  , categoryId:category.id }});
                  console.log('Producto asociado a la categoría ');
                } else {
                  console.log('La categoría no existe.');
                }
         });

         await prisma.inventory.deleteMany({where:{productId :parseInt(req.params.id , 10) }});
         productNew.inventories.forEach(async inv => {

    try {
               
                await prisma.inventory.create({data:{productId :parseInt(req.params.id , 10)  , SizeId:inv.size,  stock:parseInt(inv.stock, 10)}});
                console.log('Producto asociado a la talla ');
             
     } catch (error) {
      console.log("inv-err",error)
     }  


  });
  

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
        const product = await prisma.product.findUnique( { where: { id:parseInt(req.params.id , 10)} });

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
         // Eliminar referencias en ProductxCategory
        await prisma.productxCategory.deleteMany({
          where: { productId: product.id }
        });

        await prisma.inventory.deleteMany({
          where: { productId: product.id }
        });


        await prisma.product.delete({  where: { id: product.id },});
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
        console.log('delete/product:',error)
    }

}



module.exports = {
     crearProducto ,
     updateProduct,
     getProductByID,
     getProducts,
     delateProduct
     
}