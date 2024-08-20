

/*const { verifyAdminToken } = require('../utils/handleJwt');*/

const {prisma} = require('../config/posgresql');


// Ruta para obtener todos los productos
const getTransactions = async (req, res)  => {


    const query = req.query;
    console.log("filters...",query);
    
    const where = {};
    const include = {};

    // if (!(query.name == undefined || query.name == "")) {
    //   where.name =  {
    //     contains: query.name, // El texto que quieres buscar en el nombre
    //     mode: 'insensitive', // Opcional: hace que la búsqueda sea insensible a mayúsculas y minúsculas
    //   };
    // }

    // if (query.provider !== undefined) {
    //   where.idProvider = parseInt(query.provider,10);
    // }
    if (!(query.type == undefined || query.type == "")) {
        where.Type =query.type      
      }
      const prod = {}
      if (!(query.provider == undefined || query.provider == "")){prod.idProvider =parseInt(query.provider,10)}
      if (!(query.name == undefined || query.name == "")){prod.name={ 
        contains: query.name, // El texto que quieres buscar en el nombre
        mode: 'insensitive',}}

      if (!(query.provider == undefined || query.provider == "")  || !(query.name == undefined || query.name == "") ) {
        where.Inventario =  {
            product: prod
          // Opcional: hace que la búsqueda sea insensible a mayúsculas y minúsculas
        };
   
} 
        include.Inventario={
            
                include: {
                  product: {
                    select: {
                      name: true
                    }
                  },
                },
              }
        
        

      

    if (!(query.date == undefined || query.date == "")) {
        where.date = new Date(query.date )     
     }

  
    try {
      const paginationOptions = {};
   
   
        const totalItems = await prisma.transactions.count({
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




        const ops = await prisma.transactions.findMany({ where:where , include:include,...paginationOptions});
        console.log(ops)
        const nuevaOps = ops.map(item => {
          return {
            ...item,
            nameProduct: item.Inventario.product.name  // Agrega la nueva propiedad
          };
        });
       const  sizeResponse ={
            content: nuevaOps,
             totalPages: totalPages
            
          }
          res.json(sizeResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros' });
        console.log(error)
    }
};


const getTransactionByID = async (req, res) => {
 
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

// Ruta para crear un nuevo producto
 const createTransaction = async (req, res) => {
    
    console.log('operacion...',req.body)
    const item= req.body
    const cant = parseInt(item.quantity,10)
    
    try{
      
      
        const date = new Date();
        const onlyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
     
     
            const operation =  await prisma.transactions.upsert({
                where: {
                  // Define el filtro para encontrar el registro
                  productId_SizeId_Type_date: {
                    SizeId: item.SizeId,
                    productId: item.productId,
                    date: onlyDate,
                    Type: item.type,
                  },
                },
                update: {
                  // Define los campos que quieres actualizar si el registro existe
                  quantity: {
                    increment: cant, // Incrementa la cantidad existente
                  },
                },
                create: {
                  // Define los campos para crear un nuevo registro si no existe
                  productId: item.productId,
                  SizeId: item.SizeId,
                  date: onlyDate,
                  Type: item.type,
                  quantity: cant,
                },
              });    
        

          const inv = await prisma.inventory.findUnique({ where:   {SizeId_productId :{SizeId:item.SizeId,productId: item.productId}}});
         
          let stock = (item.type == 'SALIDA')? inv.stock-parseInt(item.quantity,10) : inv.stock+parseInt(item.quantity,10) ;
         if (stock<0) {
           
            return res.status(500).json({ message:`cantidad invalida en operacion de ${item.type}` });
         }
         
          await prisma.inventory.update( {where: {SizeId_productId :{SizeId:item.SizeId,productId: item.productId}},
            data: {
               stock: stock,
              updatedAt: new Date(), // Actualiza el campo updatedAt manualmente
            }, })
      
        res.json(operation);
    } catch (error) {
        res.status(500).json({ message:` Error al registrar operacion de ${item.type}` });
        console.log(error)
    }
}


//elimina la talla 
const delateTransaction =  async (req, res) => {
    console.log('operacion...',req.params)
    const id= req.params.id
    try {
     

        
        const oper = await prisma.transactions.findUnique({ where:{
            ID : parseInt(id,10)}});

        if (!oper) {
            return res.status(404).json(JSON.stringify({ message: 'registro  no encontrado' }));
        }
        
        await prisma.transactions.delete({
            where:  { 
                ID :  parseInt(id,10)
            }
           });

   
        res.json(JSON.stringify({ message: 'Registro eliminado correctamente' }));
    } catch (error) {
        console.log('inv...',error)
        res.status(500).json({ message: 'Error al eliminar Registro' });
    }

}

const updateTransaction= async (req, res) => {
   
    try {
        const item= req.body
      
        const inv = await prisma.inventory.findUnique({ where:  { SizeId_productId :{SizeId:item.size,productId:parseInt(req.params.id , 10)}}});

       
        if (!inv) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }else{
         const data = await prisma.inventory.update( {where: { id: category.id  },
            data: {
               stock: item.stock,
              updatedAt: new Date(), // Actualiza el campo updatedAt manualmente
            }, })
        return res.send( data )
        }
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en pruducto/updateItem', 500)
    }

}




module.exports = {
 createTransaction,
 delateTransaction,
 getTransactions,
 updateTransaction,
 getTransactionByID

}