const { Sequelize } = require('sequelize')


const database = process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST

//console.log("...",process.env.MYSQL_DATABASE);

const sequelize = new Sequelize(database, username, password, {
    host:host,
    dialect: 'mysql'
})


const dbConnectMySQL = async () => {
    try {
       
        await sequelize.authenticate()
        console.log('> Conexión establecida con la base de datos MySQL');

//    await sequelize.sync({ alter: true });//esto es para sincronizar las tablas

 
       
        
    } catch (error) {
        console.log(`> MySQL error de conexión: ${error}`)
    }
}


module.exports = { sequelize, dbConnectMySQL }