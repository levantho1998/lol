const mongoose = require('mongoose')

const categorySchema = require('./schema')
const MODEL_NAME = 'category'
const COLLECTION_NAME = 'category'

const categoryModel = mongoose.model(MODEL_NAME, categorySchema, COLLECTION_NAME)

module.exports = categoryModel