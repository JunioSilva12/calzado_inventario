const { Router } = require('express');
const { createProvider,delateProvider,getProviders,getProviderByID , updateProvider } = require('../controllers/provider');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')

const router = Router()


router.get('/', getProviders)
router.get(
    '/:id',
   getProviderByID
)


router.post(
    '/',
    [authMiddleware],
    createProvider
)

router.put(
    '/:id',
    [authMiddleware],
    updateProvider
  )

router.delete(
    '/:id',
    [authMiddleware],
    delateProvider
)


module.exports = router
