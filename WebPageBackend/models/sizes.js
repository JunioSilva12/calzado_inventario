const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')

const Sizes = sequelize.define('Sizes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    
    },
    size: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    // Otras opciones del modelo
    timestamps: true,
    tableName: 'Sizes' // Nombre de la tabla en la base de datos
  });


 

  module.exports = Sizes

  //Insert into category(id,nombre,createdAt,updatedAt ) values(12,"colchon",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
