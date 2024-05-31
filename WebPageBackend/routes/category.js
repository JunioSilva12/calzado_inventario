const { Router } = require('express');
const { getCategoriesByID, delateCategory, updateCategory, createCategory ,getCategories } = require('../controllers/category');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')

const router = Router()


router.get('/', getCategories)
router.get(
    '/:id',
   [ checkRol('admin', 'user')],
   getCategoriesByID
)
router.post(
    '/',
    [authMiddleware, checkRol('admin')],
    createCategory
)
router.put(
    '/:id',
    [authMiddleware, checkRol('admin')],
    updateCategory
)
router.delete(
    '/:id',
    [authMiddleware,  checkRol('admin')],
    delateCategory
)


module.exports = router
