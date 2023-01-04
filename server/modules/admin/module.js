const mongoose = require('mongoose')

const adminSchema = require('./schema')
const COLLECTION_NAME = 'admin'
const MODEL_NAME = 'admin'

const adminModel = mongoose.model(MODEL_NAME, adminSchema, COLLECTION_NAME)

module.exports = adminModel