const {Router} = require("express");
const { addProduct, editProduct, getSingleProduct, getAllProduct, filterProductByCategory, deleteProduct } = require("../controllers/productController");
const { AuthenticationMiddleware } = require("../middleware/Authentication.middleware");
const productRouter = Router()

productRouter.post("/:userId/add_product", AuthenticationMiddleware, addProduct);
productRouter.patch("/:userId/update_product/:id",AuthenticationMiddleware, editProduct);
productRouter.get("/:userId/single_product/:id",AuthenticationMiddleware, getSingleProduct);
productRouter.get("/:userId/all_product", AuthenticationMiddleware, getAllProduct);
productRouter.get("/:userId/filter_products/:category", AuthenticationMiddleware, filterProductByCategory);
productRouter.delete("/:userId/delete_product/:id", AuthenticationMiddleware, deleteProduct)



module.exports = productRouter;