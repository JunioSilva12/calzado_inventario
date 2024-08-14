const { Router } = require('express');
const { getTransactionByID,getTransactions,createTransaction,delateTransaction , updateTransaction} = require('../controllers/transaction');
//const { validatorGetProducts, validatorCreateProducts} = require('../validators/products');
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')

const router = Router()


router.get('/', getTransactions)
router.get(
    '/:id',
    getTransactionByID
)

router.put(
    '/:id',
    updateTransaction
)

router.post(
    '/',
    [authMiddleware],
    createTransaction
)

router.delete(
    '/:id',
    [authMiddleware],
    delateTransaction
)


module.exports = router
