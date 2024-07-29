const { Router } = require('express');
const { getCategoriesByID, delateCategory, updateCategory, createCategory ,getCategories } = require('../controllers/category');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')

const router = Router()


router.get('/', getCategories)
router.get(
    '/:id',
  
   getCategoriesByID
)
router.post(
    '/',
    [authMiddleware],
    createCategory
)
router.put(
    '/:id',
    [authMiddleware],
    updateCategory
)
router.delete(
    '/:id',
    [authMiddleware],
    delateCategory
)


module.exports = router
