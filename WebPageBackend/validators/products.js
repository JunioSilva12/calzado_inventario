const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')



const validatorGetProducts=  [
        check("id")
            .exists()
            .notEmpty(),
        validateResults
    ]

    const validatorCreateProducts=    [
        check("id")
            .exists()
            .notEmpty(),
        check("name")
            .exists()
            .notEmpty(),
        check("description")
            .exists()
            .notEmpty(),
        check("price")
            .exists()
            .notEmpty(),
        check("imgUrl")
            .exists()
            .notEmpty(),      
        validateResults
    ]
module.exports = {
    validatorGetProducts,
    validatorCreateProducts
}