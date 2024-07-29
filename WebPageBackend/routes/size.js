const { Router } = require('express');
const { getSizeByID,getSizes,createSize,delateSize } = require('../controllers/size');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')

const router = Router()


router.get('/', getSizes)
router.get(
    '/:id',
    getSizeByID
)



router.post(
    '/',
    [authMiddleware],
    createSize
)

router.delete(
    '/:id',
    [authMiddleware],
    delateSize
)


module.exports = router
