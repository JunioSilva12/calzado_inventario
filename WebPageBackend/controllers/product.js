const { matchedData } = require('express-validator');

/*const { verifyAdminToken } = require('../utils/handleJwt');*/
const { handleHttpError } = require('../utils/handleError');
const {prisma} = require('../config/posgresql');
const { createClient } = require('@supabase/supabase-js');
const { Storage } = require('megajs');
const sharp = require('sharp');


// Ruta para obtener todos los productos
const getProducts = async (req, res)  => {


   const query = req.query;
    console.log("filters...",query);
    
    const where = {};

    if (!(query.name == undefined || query.name == "")) {
      where.name =  {
        contains: query.name, // El texto que quieres buscar en el nombre
        mode: 'insensitive', // Opcional: hace que la búsqueda sea insensible a mayúsculas y minúsculas
      };
    }
    if (query.provider !== undefined) {
      where.idProvider = parseInt(query.provider,10);
    }
    if (query.categoryId !== undefined) {
      where.categories ={some:{categoryId: parseInt(query.categoryId,10)}} 
    
    }

    console.log("query...",where);
 
    const paginationOptions = {};
   
    try {
      const totalItems = await prisma.product.count({
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


         products = await prisma.product.findMany( {
          where:where,
          include: {
            categories: {
              include: {
                category: true,
              }
            }
           },// Incluye las categorías relacionadas que pendejo soyyyyyyyyyyyyyyyyyyyyy
           ...paginationOptions
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
            totalPages: totalPages
            
          }
           res.json(ProductResponse);
         
    
   
        
       
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
        console.log('error....',error)
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

         //await prisma.inventory.upsert({where:{productId :parseInt(req.params.id , 10) }});
         productNew.inventories.forEach(async inv => {
          await prisma.inventory.upsert({
            where: {
              SizeId_productId: {
                productId: parseInt(req.params.id, 10),
                SizeId: inv.size,
              },
            },
            create: {
              productId :parseInt(req.params.id , 10)  ,
                 SizeId:inv.size,
                   stock:parseInt(inv.stock, 10)
              // Aquí deberías incluir las otras propiedades necesarias para crear el registro, como `SizeId` y `stock`.
            },
            update: {
              stock:parseInt(inv.stock, 10)
            },
          });
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

const delateImgProduct = async (req, res) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  try {
    const { filename } = req.params;

    const { error } = await supabase.storage
      .from('productImages')
      .remove([`public/${filename}`]);

    if (error) {
      throw error;
    }

    res.status(200).send({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}


const setImgProduct = async (req, res) => {

  const storage = new Storage({
    email: process.env.MEGA_EMAIL,
    password: process.env.MEGA_PASSWORD
  });
  
  if (!req.file) {
    return res.status(400).send('No se ha subido ningún archivo.');
  }

      const ext = req.file.originalname.split('.').pop()
        const filename = `file-${Date.now()}.${ext}`

  try {
    // Comprimir la imagen utilizando Sharp
    const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 200 }) // Redimensiona la imagen (opcional)
      .jpeg({ quality: 80 })  // Ajusta la calidad (puedes modificarla según necesites)
      .toBuffer();

    // Esperar a que el almacenamiento de Mega esté listo
    storage.on('ready', () => {
      console.log('Conectado a MEGA!');

  // Especificar la carpeta donde quieres subir el archivo
  const folderName = 'product_images';

  // Buscar o crear la carpeta
  let folder = storage.root.children.find(f => f.name === folderName);
  if (!folder) {
    folder = storage.root.upload({ name: folderName });
    folder.on('complete', () => {
      console.log(`Carpeta '${folderName}' creada exitosamente.`);
      uploadToMega(folder);
    });
  } else {
    uploadToMega(folder);
  }




      // Sube el archivo comprimido a Mega
      function uploadToMega(folder) {
        const upload = folder.upload({
          name: filename, // Nombre del archivo en MEGA
          size: compressedBuffer.length // Tamaño del archivo comprimido
        });

        upload.end(compressedBuffer);

        upload.on('complete', (file) => {
         // const fileURI = file.link;
         console.log(`el archico ${file}`)
         const fileURI = `https://mega.nz/file/${file.id}#${file.key}`;
         console.log('la uri....',fileURI)
          console.log(`Archivo comprimido subido correctamente a Mega en la carpeta ${folderName}: ${file.name}`);
          res.send({
            message: 'Archivo subido exitosamente a Mega',
            fileName: file.name,
            fileURI:  fileURI
          });
        });

        upload.on('error', (err) => {
          console.error('Error subiendo a Mega:', err);
          res.status(500).send('Error subiendo el archivo a Mega.');
        });
      }
    });
  } catch (err) {
    console.error('Error comprimiendo la imagen:', err);
    res.status(500).send('Error procesando la imagen.');
  }
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const putImgProduct = async (req, res) => {


  try {

    const compressedBuffer = await sharp(req.file.buffer)
    .resize({ width: 200 }) // Redimensiona la imagen (opcional)
    .jpeg({ quality: 50 })  // Ajusta la calidad (puedes modificarla según necesites)
    .toBuffer();


    const ext = req.file.originalname.split('.').pop()
      const filename = `file-${Date.now()}.${ext}`
    console.log('body....',req.body)
    const { data, error } = await supabase.storage
      .from('productImages')
      .upload(`public/${filename}`,compressedBuffer);
    
    if (error) {
      console.log('el error',error);
      throw error;
    }

    const { publicURL, error: publicURLError } = supabase.storage
      .from('productImages')
      .getPublicUrl(`public/${filename}`);

    if (publicURLError) {
      throw publicURLError;
    }

    
    const delay = 5 * 60 * 1000; // 5 minutos en milisegundos
    let remainingTime = delay/1000;


    const countdownInterval = setInterval(() => {
      remainingTime -= 10;
      console.log(`Faltan ${remainingTime} segundos para verificar o eliminar la imagen.${filename}`);
  }, 10 * 1000); 
    setTimeout(async () => {
      clearInterval(countdownInterval); // Detener la cuenta regresiva
      const product = await prisma.product.findFirst({ 
        where:{ imgUrl:filename}});
        console.log('el producto es:',product)
     if (!product) {
      console.log('Iniciando limpieza de imagenes temporales...');
      try {
        const { error } = await supabase.storage
      .from('productImages')
      .remove([`public/${filename}`]);
    
        if (error) throw error;
    
        console.log('Archivo temporal eliminado exitosamente:', filename);
      } catch (error) {
        console.error('Error eliminando el archivo temporal:', error.message);
      }
    
     }else{
      console.log('Archivo temporal guardado :', filename);
     }
     console.log('Limpieza completada.');


    }, delay);


    res.status(200).send({ message: 'Imagen subida correctamente' , uri: filename });
  } catch (error) {
    console.error(error);
     (error.error =='Duplicate')?  res.status(200).json({ message: 'Imagen ya estaba subida' , uri: req.file.originalname })
     : res.status(500).send({ error: error.message });
  }


  // Función para eliminar el archivo temporal


 
}

module.exports = {
  setImgProduct,
     crearProducto ,
     updateProduct,
     getProductByID,
     getProducts,
     delateProduct,
     delateImgProduct,
     putImgProduct
     
}