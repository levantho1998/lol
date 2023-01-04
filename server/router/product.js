const express = require("express");

const productHandlers = require("../modules/product");

const productRouter = express.Router();

productRouter.get("/", productHandlers.findMany);

productRouter.get("/details/:id", productHandlers.findOne);

productRouter.post("/", productHandlers.create);

productRouter.put("/", productHandlers.update);

productRouter.put("/updateQuantity", productHandlers.updateQuantitySold);

productRouter.delete("/:id", productHandlers.delete);

productRouter.get("/hotProd", productHandlers.getHotProduct);

module.exports = productRouter;
