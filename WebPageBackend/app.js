require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path');
const morgan = require('morgan');
const morganBody = require('morgan-body')


//const { dbConnectMySQL } = require('./config/mysql');
const { dbConnectPostgresql , prisma  } = require('./config/posgresql');
//const { usersModel ,proveedorModel ,productModel ,categoryModel , productXcategoryModel  } = require('./models/');

const app = express()
app.use(cors())
app.use(express.json())

morganBody(app);




app.use(morgan('dev'));
//app.use(express.static('../ecomerce-Frontend/dist'))
// Servir archivos estáticos desde el directorio frontend
app.use('/public', express.static(path.join(__dirname, 'dist')));
//app.use('/public', express.static(path.join(__dirname, '../ecomerce-Frontend/public')));
app.use(express.static(path.join(__dirname, 'dist')));
//app.use(express.static(path.join(__dirname, '../ecomerce-Frontend/dist')));

app.use('/api', require('./routes'))

// Configuración de morgan-body

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



const port = process.env.PORT || 3000
const por2 =  3001





//console.clear()

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
});

 
// dbConnectPostgresql().then(() => {
//    app.listen(por2, () => {
//      console.log(`Server running at http://localhost:${por2}`);
//    });
//  });



main = async () =>{
//await dbConnectMySQL();

await dbConnectPostgresql().then(() => {
  app.listen(por2, () => {
    console.log(`Server running at http://localhost:${por2}`);
   // console.log(prisma)
  });
});
// Inicia la conexión a la base de datos y el servidor


const { encrypt } = require('./utils/handlePassword')
//const { usersModel } = require('./models')
/*
const hashedPassword = await encrypt("elproadmin");

await prisma.user.create({
  data: {
  
    firstname: 'PAOLA ',
    lastname: 'SANCHEZ',
    email:'calzadocalixsport2@gmail.com',
    password: hashedPassword
  }
});


// con este script pusimos al admin
/*const { usersModel } = require('./models')
const usuario = await usersModel.findByPk(1092342682);
usuario.destroy();*/
}


main();