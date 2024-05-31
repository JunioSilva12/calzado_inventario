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
app.get('/', (req, res) => {
    res.send("hola-mundo");
  });
app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
});
main = async () =>{
await dbConnectMySQL();


/*
await productXcategoryModel.create({
  productId: 11,
  categoryId: 101 });

/*


await categoryModel.create({
  id: 101,
  name: 'inmuebles' });
  /*
await productModel.create({
  id: 11,
  name: 'colchon 1',
  description : 'el colchon 1',
  idProvider : 11 ,
  
  imgUrl: 'product.svg',
  price : 10000 ,
  stock: 40

});*/
/*
const { encrypt } = require('./utils/handlePassword')
const { usersModel } = require('./models')
await usersModel.create({
  userId: 1092342682 ,
  name:'Juan Roberto Martinez',
  email:'patyrosas729@gmail.com',
  rol: 'ROLE_ADMIN',
  password: await encrypt('elproadmin')
});*/
// con este script pusimos al admin
/*const { usersModel } = require('./models')
const usuario = await usersModel.findByPk(1092342682);
usuario.destroy();*/
}


main();