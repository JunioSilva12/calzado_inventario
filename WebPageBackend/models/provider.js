const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')

const Provider = sequelize.define('provider', {
    idProvider: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    ref: {
      type: DataTypes.STRING(30),
      //allowNull: false
    }
    
  }, {
    // Otras opciones del modelo
    timestamps: true,
    tableName: 'provider' // Nombre de la tabla en la base de datos
  });

  module.exports = Provider