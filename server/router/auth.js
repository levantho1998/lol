const express = require('express')

const authRouter = new express.Router()
const authHandlers = require('../modules/auth')


authRouter.get('/', authHandlers.findMany)
authRouter.post('/sign-up', authHandlers.signUp)
authRouter.post('/sign-in', authHandlers.signIn)
authRouter.put('/update-user', authHandlers.update)


module.exports = authRouter