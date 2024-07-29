require('dotenv').config()

const express = require('express')
const cors = require('cors')

const morganBody = require('morgan-body')


const { dbConnectMySQL } = require('./config/mysql')

const { usersModel ,proveedorModel ,productModel ,categoryModel , productXcategoryModel  } = require('./models/');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


morganBody(app)


const port = process.env.PORT || 3000

app.use('/api', require('./routes'))


//console.clear()

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
});
main = async () =>{
await dbConnectMySQL();


/*
const { encrypt } = require('./utils/handlePassword')
const { usersModel } = require('./models')
await usersModel.create({
 
  firstName:'Juan',
  lastName:'Sanchez',
  email:'patyrosas729@gmail.com',
  rol: 'ROLE_ADMIN',
  password: await encrypt('elproadmin')
});
// con este script pusimos al admin
/*const { usersModel } = require('./models')
const usuario = await usersModel.findByPk(1092342682);
usuario.destroy();*/
}


main();