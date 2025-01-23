
const express = require('express')
const invoiceRouter = require('./invoice.routes')
const swaggerRouter = require('./swagger.routes')
const mainRouter = express.Router()

mainRouter.use('/invoice',invoiceRouter)
mainRouter.use('/api-docs',swaggerRouter)
module.exports = mainRouter