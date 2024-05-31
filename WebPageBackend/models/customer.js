const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize');
const User = require('./users'); // Ajusta la ruta según la ubicación del modelo Usuario

// Definir el modelo Cliente
const Customer = sequelize.define('customer', {
  Customer_Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    
  },
  userId: {
    type: DataTypes.INTEGER,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  address: {
    type: DataTypes.STRING(20)
  }
}, {
  // Otras opciones del modelo
  timestamps: true,
  tableName: 'Customer' // Nombre de la tabla en la base de datos
});

// Establecer la relación con el modelo Usuario

Customer.belongsTo(User, { foreignKey: 'userId' });
module.exports = Customer