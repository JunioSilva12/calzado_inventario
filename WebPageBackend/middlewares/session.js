const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const {prisma} = require('../config/posgresql');





const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return handleHttpError(res, 'Not Token', 401)
       //  console.log("req...",req.headers); 
        const token = req.headers.authorization.split(' ').pop()
        //console.log("token sesion...",token);
        const dataToken = await verifyToken(token)
       console.log("iniciando sesion...",dataToken);
        if (!dataToken) return handleHttpError(res, 'Error data token', 401)

        
        req.user = await prisma.user.findUnique({where:{id:dataToken.id}})
        console.log("req...",req.user); 
        next()
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Not Session', 401)
    }
}


module.exports = authMiddleware