

/*const { verifyAdminToken } = require('../utils/handleJwt');*/

const {prisma} = require('../config/posgresql');


// Ruta para obtener todos los productos
const getInventories = async (req, res)  => {
    try {
        const sizes = await prisma.inventory.findMany({ where:  { SizeId_productId :{productId:parseInt(req.params.id , 10)}}});
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
 const createInventory = async (req, res) => {
    
    try {

      
         console.log('inv...',req.body)
         const item = req.body
         const date = new Date();
        const onlyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const inventory = await prisma.inventory.create({data:{
          
            stock: parseInt(req.body.stock , 10),
            product: {
                connect: { id: parseInt(req.body.idProduct , 10)}
            },
            size: {
                connect: { id: req.body.size.id }
            },
            
          }});

          await prisma.transactions.create({
            data :  {
                // Define los campos para crear un nuevo registro si no existe
                productId: parseInt(item.idProduct , 10),
                SizeId: item.size.id ,
                date: onlyDate,
                Type: 'ENTRADA',
                quantity: parseInt(req.body.stock , 10),
              },
          })
      
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar talla' });
        console.log(error)
    }
}


//elimina la talla 
const delateInventory =  async (req, res) => {
   
    try {
        const item= req.body
        console.log('inv...',req.params.id)
        const inv = await prisma.inventory.findUnique({ where:  { SizeId_productId :{SizeId:item.size,productId:parseInt(req.params.id , 10)}}});

        if (!inv) {
            return res.status(404).json(JSON.stringify({ message: 'talla  no encontrada' }));
        }
        
        await prisma.inventory.delete({
            where:  { SizeId_productId :{SizeId:item.size,productId:parseInt(req.params.id , 10)}}
           });

   
        res.json(JSON.stringify({ message: 'Talla eliminado correctamente' }));
    } catch (error) {
        console.log('inv...',error)
        res.status(500).json({ message: 'Error al eliminar Inventario' });
    }

}

const updateInventory = async (req, res) => {
   
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

     getInventories,
     delateInventory,
     createInventory,updateInventory
}