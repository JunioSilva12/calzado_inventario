const { Router } = require('express')
const {getUserByID, createUser, updateUser, getUsers , delateUser} = require('../controllers/user')
//const { validatorUser } = require('../validators/user')
const authMiddleware = require('../middlewares/session')
const checkRol = require('../middlewares/rol')

const router = Router()


router.get('/', getUsers)
router.get(
    '/:id',
 //  [ checkRol('admin', 'user'),validatorGetProducts],
   getUserByID
)

router.put(
  '/:id',
  [authMiddleware, checkRol('ROLE_ADMIN')],
  updateUser
)

router.post(
    '/',
    [authMiddleware, checkRol('ROLE_ADMIN')],
    createUser
)





router.put(
    '/:id',
  //  [authMiddleware, checkRol('admin'), validatorGetProducts, validatorCreateProducts],
    updateUser
)
router.delete( 
    '/:id',
  //  [authMiddleware,  checkRol('admin'),  validatorGetProducts],
    delateUser
)

module.exports = router