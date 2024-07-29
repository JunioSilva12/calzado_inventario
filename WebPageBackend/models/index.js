

//const ENGINE_DB = process.env.ENGINE_DB

const pathModels = '.'

const models = {
    usersModel: require(`${pathModels}/users`),
    providerModel: require(`${pathModels}/provider`),
    productModel: require(`${pathModels}/products`),
    categoryModel: require(`${pathModels}/category`),
    productXcategoryModel: require(`${pathModels}/productXcategory`),
    sizesModel: require(`${pathModels}/sizes`),
    InventoryModel: require(`${pathModels}/inventory`),
}


module.exports = models