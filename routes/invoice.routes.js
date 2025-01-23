
const express = require('express')
const getInvoice = require('../controllers/invoice/getInvoices')
const getInvoiceforOnePatient = require('../controllers/invoice/getInvoiceforPatient')
const getBillItemDetails = require('../controllers/invoice/getBillItemDetails')
const invoiceRouter = express.Router()

invoiceRouter
.get('/getinvoices',getInvoice) 
.get('/getinvoicesForPatient',getInvoiceforOnePatient) 
.get('/getBillItemDetails',getBillItemDetails)



module.exports = invoiceRouter