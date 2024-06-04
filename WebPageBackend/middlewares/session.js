const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { usersModel } = require('../models')
const getProperties = require('../utils/handlePropertiesEngine')

const propertiesKey = getProperties()


const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return handleHttpError(res, 'Not Token', 401)
       //  console.log("req...",req.headers); 
        const token = req.headers.authorization.split(' ').pop()
        //console.log("token sesion...",token);
        const dataToken = await verifyToken(token)
       console.log("iniciando sesion...",dataToken);
        if (!dataToken) return handleHttpError(res, 'Error data token', 401)

        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }
        req.user = await usersModel.findOne(query)
        console.log("req...",req.user); 
        next()
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Not Session', 401)
    }
}


module.exports = authMiddleware