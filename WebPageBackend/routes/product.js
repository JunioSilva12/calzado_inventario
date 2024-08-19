const { Router } = require('express');
const { crearProducto, getProductByID, getProducts, updateProduct ,delateProduct ,delateImgProduct ,setImgProduct,putImgProduct  } = require('../controllers/product');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
//const checkRol = require('../middlewares/rol')
//const {loadFileImage , uploadImage} =  require('../utils/handleUploadImage');
const router = Router()
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');

router.get('/', getProducts)
router.get(
    '/:id',
  //checkRol('ROLE_ADMIN', 'ROLE_OPERATOR'),validatorGetProducts,
   getProductByID
)
router.post(
    '/',
    [authMiddleware],
    crearProducto
)




// router.post(
//     '/image',
//     // [authMiddleware],
//     uploadImage.fields([{ name: 'file', maxCount: 1 }]),
//     loadFileImage
// )


// Middleware de Multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para subir archivos
router.post('/image', upload.single('file'), putImgProduct);
//router.post('/image', upload.single('file'), setImgProduct);
//setImgProduct

router.put(
    '/:id',
    [authMiddleware],
    updateProduct
)
router.delete( 
    '/:id',
    [authMiddleware],
    delateProduct
)

router.delete('/image/:filename',[authMiddleware], delateImgProduct);

module.exports = router

