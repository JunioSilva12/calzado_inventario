const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handlePassword')
const { usersModel } = require('../models')
const { tokenSign } = require('../utils/handleJwt')
const { handleHttpError } = require('../utils/handleError')
const {prisma} = require('../config/posgresql');
const ENGINE_DB = process.env.ENGINE_DB

// const register = async (req, res) => {
//     try {
//         const { password, ...rest } = matchedData(req)
         

//         console.log("el resto:",password)
//         const user = await usersModel.create({
//             ...rest,
//             password: await encrypt(password)
//         })
//         console.log("nuevo usuario:",user)
//         user.set('password', undefined, { strict: false })

//         const data = {
//             token: await tokenSign(user),
//             user
//         }
//         return res.send({ data })
//     } catch (error) {
//         console.log(error)
//         return handleHttpError(res, 'Error en auth/register', 500)
//     }
// }

const login = async (req, res) => {
    //console.log('req...'+ req);
    try {
       // console.log('req...'+req);
        const { password, email } = matchedData(req)
        console.log(matchedData(req));
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return handleHttpError(res, 'Correo incorrecto o contraseña incorrectos', 401)

        const check = await compare(password, user.password)
      //  console.log('check..',check,user)
        if (!check) return handleHttpError(res, 'Correo o contraseña incorrectos', 401)

        user.password=undefined;//cambiar el modelo a enviar para no enviar la contraseña.

        const data = {
            token: await tokenSign(user),
            user
        }

        return res.send({ data })
    } catch (error) {
        
        console.log(error)
        return handleHttpError(res, 'Error en auth/login', 500)
    }
}


module.exports = { login }