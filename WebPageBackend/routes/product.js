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
  //checkRol('ROLE_ADMIN', 'ROLE_OPERATOR'),validatorGetProducts,
   getProductByID
)
router.post(
    '/',
    [authMiddleware, checkRol('ROLE_ADMIN'), validatorCreateProducts],
    crearProducto
)



router.post(
    '/image',
    [authMiddleware, checkRol('ROLE_ADMIN')],
    uploadImage.fields([{ name: 'file', maxCount: 1 }]),
    loadFileImage
)


router.put(
    '/:id',
    [authMiddleware, checkRol('ROLE_ADMIN'),  validatorCreateProducts],
    updateProduct
)
router.delete( 
    '/:id',
    [authMiddleware,  checkRol('ROLE_ADMIN'),  validatorGetProducts],
    delateProduct
)


module.exports = router

