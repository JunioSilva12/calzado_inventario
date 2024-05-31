const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const ENGINE_DB = process.env.ENGINE_DB

const validatorGetItem =  [
        check("id")
            .exists()
            .notEmpty(),
        validateResults
    ]

module.exports = {
    validatorGetItem
}