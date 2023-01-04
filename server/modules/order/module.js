const mongoose = require('mongoose')

const orderSchema = require('./schema')
const MODEL_NAME = 'orders'
const COLLECTION_NAME = 'orders'

const orderModel = mongoose.model(MODEL_NAME, orderSchema, COLLECTION_NAME)

module.exports = orderModel