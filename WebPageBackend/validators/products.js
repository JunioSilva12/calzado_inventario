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
        check("nombre")
            .exists()
            .notEmpty(),
        check("descripción")
            .exists()
            .notEmpty(),
        check("precio")
            .exists()
            .notEmpty(),
        check("imagen")
            .exists()
            .notEmpty(),      
        validateResults
    ]
module.exports = {
    validatorGetProducts,
    validatorCreateProducts
}