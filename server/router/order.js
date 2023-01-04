const express = require('express')

const orderHandlers = require('../modules/order')

const orderRouter = new express.Router()


orderRouter.get('/', orderHandlers.findMany)
orderRouter.post('/', orderHandlers.create)
orderRouter.delete('/', orderHandlers.delete)


module.exports = orderRouter