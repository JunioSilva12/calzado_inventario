const { sign, verify } = require('jsonwebtoken')
const getProperties = require('./handlePropertiesEngine')

const propertiesKey = getProperties()

const JWT_SECRET = process.env.JWT_SECRET


const tokenSign = async (user) => sign(
    {
        [propertiesKey.id]: user[propertiesKey.id],
        name:user.firstname
    },
    JWT_SECRET,
    { expiresIn: "2h" }
)


const verifyToken = async (token) => {
    try {
        return verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}

const verifyAdminToken = async (token) => {
    try { 
        verify(token, JWT_SECRET, (err, decoded) => {///ojo posible error
        if (err) {
            return res.status(401).json({ message: 'Token de sesión inválido' });
        }
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permisos de administrador' });
        }
        req.admin = decoded; // Guardar los detalles del administrador en el objeto de solicitud para su uso posterior
        next();
    });
    
    
    } catch (error) {
        return null
    }
}



module.exports = { tokenSign, verifyToken , verifyAdminToken }