const mongoose = require('mongoose')

const userProfileSchema = require('./schema')
const MODEL_NAME = 'user-profiles'
const COLLECTION_NAME = 'user-profiles'

const userProfileModel = mongoose.model(MODEL_NAME, userProfileSchema, COLLECTION_NAME)

module.exports = userProfileModel

