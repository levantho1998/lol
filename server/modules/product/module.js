const mongoose = require('mongoose')

const productSchema = require('./schema')
const COLLECTION_NAME = 'products'
const MODEL_NAME = 'products'

const productModel = mongoose.model(MODEL_NAME, productSchema, COLLECTION_NAME)

module.exports = productModel
