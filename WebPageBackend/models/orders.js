const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')


const Order = sequelize.define('order', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: DataTypes.DATE
    },
    total: {
      type: DataTypes.FLOAT
    },
    customerID: {
      type: DataTypes.INTEGER
    }
  }, {
    // Otras opciones del modelo
    timestamps: true,
    tableName: 'order' // Nombre de la tabla en la base de datos
  });
  
  // Establecer la relación con el modelo Cliente

const Customer = require("./customer");
Order.hasMany(Customer, { foreignKey: 'customerID' });
  
  module.exports = Order