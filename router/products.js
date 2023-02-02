const routes = require('express').Router();
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controller/products")

routes.get('/getProducts', getProducts)
routes.post('/createProduct', createProduct)
routes.put('/updateProduct', updateProduct)
routes.delete('/deleteProduct/:id', deleteProduct)

module.exports = routes;