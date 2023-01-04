const express = require('express')

const categoryHandlers = require('../modules/category')

const categoryRouter = new express.Router()


categoryRouter.get('/', categoryHandlers.findMany)
categoryRouter.post('/', categoryHandlers.create)
categoryRouter.delete('/:id', categoryHandlers.delete)


module.exports = categoryRouter