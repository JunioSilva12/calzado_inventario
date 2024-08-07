const { matchedData } = require('express-validator');
const { usersModel } = require('../models');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');
const { encrypt } = require('../utils/handlePassword')
const {prisma} = require('../config/posgresql');

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { password, ...rest } = matchedData(req.body)
       // console.log("el resto:",...rest)
        console.log("req...",req.body); 
        console.log("password...",password); 
        const newUser =req.body;
         const user = await usersModel.create({
            firstName:newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
            password: await encrypt(newUser.password)
        })
        user.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(user),
            user
        }
        return res.send({ data })
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Error en auth/register', 500)
    }
    

  
};

// Controlador para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const usuarios = await usersModel.findAll();
       
        const contentUsers =  usuarios.map(  (user) => (
            {
            id : user.userId ,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,           
            updatedAt:user.updatedAt,
            createdAt:user.createdAt,
            role:user.role,
            password: user.password
        }));
        console.log(contentUsers,"Users...",usuarios);
        // Enviar respuesta con la lista de usuarios
        res.json({
            content:contentUsers,
            totalPages: (usuarios.length % 10 == 0)  ?  Math.floor(usuarios.length/20)  :   Math.floor(usuarios.length / 20) +1 
          });
    } catch (error) {
        // Enviar respuesta con el mensaje de error
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
    }
};

// Controlador para eliminar un usuario por ID
const delateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el usuario por ID
        const usuario = await usersModel.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Eliminar el usuario de la base de datos
        await usuario.destroy();

        // Enviar respuesta con el mensaje de éxito
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        // Enviar respuesta con el mensaje de error
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message });
    }
};

// Controlador para actualizar un usuario por ID



const  getUserByID = async (req, res) => {
    try {
        const { id } = req.params;
       

        // Buscar el usuario por ID
        let usuario = await usersModel.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        // Enviar respuesta con el mensaje de error
        res.status(500).json({ mensaje: `Error al obtener usuario${id}`, error: error.message });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, correo, contraseña, rol } = req.body;

        // Buscar el usuario por ID
        let usuario = await usersModel.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Actualizar los datos del usuario
        usuario.firstName = firstName;
        usuario.lastName = lastName;
        usuario.correo = correo;
        usuario.contraseña = contraseña;
        usuario.rol = rol;

        // Guardar los cambios en la base de datos
        await usuario.save();

        // Enviar respuesta con el usuario actualizado
        res.json(usuario);
    } catch (error) {
        // Enviar respuesta con el mensaje de error
        res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
    }
};

module.exports = { getUserByID, createUser, updateUser, getUsers , delateUser }