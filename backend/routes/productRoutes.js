const {Router} = require("express");
const { addProduct, editProduct, getSingleProduct, getAllProduct, filterProductByCategory, deleteProduct } = require("../controllers/productController");
const { AuthenticationMiddleware } = require("../middleware/Authentication.middleware");
const productRouter = Router()

productRouter.post("/:user/add_product", AuthenticationMiddleware, addProduct);
productRouter.patch("/:user/update_product/:id/:title",AuthenticationMiddleware, editProduct);
productRouter.get("/:user/single_product/:id/:title",AuthenticationMiddleware, getSingleProduct);
productRouter.get("/:user/all_product", AuthenticationMiddleware, getAllProduct);
productRouter.get("/:user/filter_products/:category", AuthenticationMiddleware, filterProductByCategory);
productRouter.delete("/:user/delete_product/:id/:title", AuthenticationMiddleware, deleteProduct)



module.exports = productRouter;