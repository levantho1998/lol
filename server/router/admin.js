const express = require('express')

const adminRouter = new express.Router()
const adminHandlers = require('../modules/admin/index')

adminRouter.post('/sign-in', adminHandlers.signIn)
adminRouter.post('/sign-up', adminHandlers.signUp)


module.exports = adminRouter