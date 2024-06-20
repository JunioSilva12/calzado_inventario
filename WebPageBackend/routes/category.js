const { Router } = require('express');
const { getCategoriesByID, delateCategory, updateCategory, createCategory ,getCategories } = require('../controllers/category');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')

const router = Router()


router.get('/', getCategories)
router.get(
    '/:id',
   /*[ checkRol('ROLE_ADMIN', 'user')],*/
   getCategoriesByID
)
router.post(
    '/',
    [authMiddleware, checkRol('ROLE_ADMIN')],
    createCategory
)
router.put(
    '/:id',
    [authMiddleware, checkRol('ROLE_ADMIN')],
    updateCategory
)
router.delete(
    '/:id',
    [authMiddleware,  checkRol('ROLE_ADMIN')],
    delateCategory
)


module.exports = router
