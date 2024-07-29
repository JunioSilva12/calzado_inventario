const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')

const Inventory = sequelize.define('Inventory', {

      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
  
      },

   
  }, {
    // Otras opciones del modelo
    timestamps: true,
    tableName: 'Inventory',
     // Nombre de la tabla en la base de datos
   
  });
Inventory.removeAttribute("id");


  const Sizes= require('./sizes');
  const Product= require('./products');

  Sizes.belongsToMany(Product,{ through: Inventory });
  Product.belongsToMany(Sizes, { through: Inventory });
  Sizes.hasMany(Inventory);
  Product.hasMany(Inventory);



  module.exports = Inventory