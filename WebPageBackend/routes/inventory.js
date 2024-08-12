const { Router } = require('express');
const { delateInventory ,createInventory ,updateInventory} = require('../controllers/inventory');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')

const router = Router()



router.post(
    '/',
    [authMiddleware],
    createInventory
)

router.put(
    '/:id',
    [authMiddleware],
    updateInventory
)

router.delete(
    '/:id',
    [authMiddleware],
    delateInventory
)


module.exports = router
