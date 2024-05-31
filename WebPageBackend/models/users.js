const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'user',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
           
          },
       
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
       
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM(['ROLE_OPERATOR', 'ROLE_ADMIN']),
            defaultValue: 'ROLE_OPERATOR'
        }
    },
    {
        timestamps: true ,
        tableName: 'user' // Nombre de la tabla en la base de datos
    }
)


module.exports = User