const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')


const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(300)
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0

    },
    imgUrl: {
      type: DataTypes.STRING(200)
    },
    
    idProvider: {
      type: DataTypes.INTEGER
    }
  }, {
    // Otras opciones del modelo
    timestamps: true,
    tableName: 'product' // Nombre de la tabla en la base de datos
  });
  
  // Establecer la relación con el modelo Proveedor
  const Provider = require('./proveedor'); // Ajusta la ruta según la ubicación del modelo Proveedor
  Product.belongsTo(Provider, { foreignKey: 'idProvider' });

  




  
  module.exports = Product