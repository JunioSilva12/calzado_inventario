const { sequelize } = require("../config/mysql");
const { DataTypes } = require('sequelize')

const OrderDetails = sequelize.define('detallespedido', {
    iddetalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idpedido: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    },
    cantidad: {
      type: DataTypes.INTEGER
    },
    precio_unitario: {
      type: DataTypes.FLOAT
    }
  }, {
    // Otras opciones del modelo
    timestamps: false,
    tableName: 'detallespedido' // Nombre de la tabla en la base de datos
  });
  
  // Establecer las relaciones con los modelos Pedido y Producto
  const Order = require('./orders'); // Ajusta la ruta según la ubicación del modelo Pedido
  const Product = require('./products'); // Ajusta la ruta según la ubicación del modelo Producto
  OrderDetails.hasMany(Order, { foreignKey: 'orderId' });
  OrderDetails.belongsTo(Product, { foreignKey: 'productId' });
  
  module.exports = OrderDetails