const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')

const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    // Otras opciones del modelo
    timestamps: false,
    tableName: 'category' // Nombre de la tabla en la base de datos
  });


 

  module.exports = Category

  //Insert into category(id,nombre,createdAt,updatedAt ) values(12,"colchon",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
