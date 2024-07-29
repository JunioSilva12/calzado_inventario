const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')

const ProductxCategory = sequelize.define('ProductxCategory', {

   
  }, {
    // Otras opciones del modelo
    timestamps: true,
    tableName: 'ProductxCategory', // Nombre de la tabla en la base de datos
   
   
    

  });
  ProductxCategory.removeAttribute("id");


 const Category= require('./category');
const Product= require('./products');

Category.belongsToMany(Product,{ through: ProductxCategory  });
Product.belongsToMany(Category, { through: ProductxCategory });
  Category.hasMany(ProductxCategory);
  Product.hasMany(ProductxCategory);

  module.exports = ProductxCategory