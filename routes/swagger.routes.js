
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../documentation/swagger');
const swaggerRouter = express.Router()


swaggerRouter.use('/',swaggerUi.serve, swaggerUi.setup(swaggerDocs))



module.exports = swaggerRouter