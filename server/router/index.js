const express = require("express");

const productRouter = require("./product");
const authRouter = require("./auth");
const orderRouter = require("./order");
const paymentRouter = require("./payment");
const uploadRouter = require("./upload");
const adminRouter = require("./admin");
const categoryRouter = require("./category");

const router = new express.Router();

router.use("/api/product", productRouter);
router.use("/api/auth", authRouter);
router.use("/api/order", orderRouter);
router.use("/api", paymentRouter);
router.use("/api/upload", uploadRouter);
router.use("/api/admin", adminRouter);
router.use("/api/category", categoryRouter);

module.exports = router;
