const { Router } = require('express');
const { crearProducto, getProductByID, getProducts, updateProduct ,delateProduct } = require('../controllers/product');
const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')
const {loadFileImage , uploadImage} =  require('../utils/handleUploadImage');
const router = Router()


router.get('/', getProducts)
router.get(
    '/:id',
 //  [ checkRol('admin', 'user'),validatorGetProducts],
   getProductByID
)
router.post(
    '/',
   // [authMiddleware, checkRol('admin'), validatorCreateProducts],
    crearProducto
)



router.post(
    '/image',
   // [authMiddleware, checkRol('admin')],
    uploadImage.fields([{ name: 'file', maxCount: 1 }]),
    loadFileImage
)


router.put(
    '/:id',
  //  [authMiddleware, checkRol('admin'), validatorGetProducts, validatorCreateProducts],
    updateProduct
)
router.delete( 
    '/:id',
  //  [authMiddleware,  checkRol('admin'),  validatorGetProducts],
    delateProduct
)


module.exports = router

