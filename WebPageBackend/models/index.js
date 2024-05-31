

//const ENGINE_DB = process.env.ENGINE_DB

const pathModels = '.'

const models = {
    usersModel: require(`${pathModels}/users`),
    //storagesModel: require(`${pathModels}/storage`),
    customerModel: require(`${pathModels}/customer`),
    proveedorModel: require(`${pathModels}/proveedor`),
    orderModel: require(`${pathModels}/orders`),
    productModel: require(`${pathModels}/products`),
    orderDetailsModel: require(`${pathModels}/orderDetails`),
    categoryModel: require(`${pathModels}/category`),
    productXcategoryModel: require(`${pathModels}/productXcategory`),
}


module.exports = models