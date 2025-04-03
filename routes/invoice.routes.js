
const express = require('express')
const getInvoice = require('../controllers/invoice/getInvoices')
const getInvoiceforOnePatient = require('../controllers/invoice/getInvoiceforPatient')
const getBillItemDetails = require('../controllers/invoice/getBillItemDetails')
const postUpdateBillItemDetails  = require('../controllers/invoice/postUpdateBillItemDetails')
const postCreateTempNewInvoice = require('../controllers/invoice/postCreateTempNewInvoice')
const postSaveTempInvoicetoConfirm = require('../controllers/invoice/postSaveTempInvoicetoConfirm')
const deleteItemFromKart = require('../controllers/invoice/deleteItemFromKart')
const updateBillietmdetailsOld = require('../model/services/invoice/updateBillietmdetailsOld')
const postUpdateBillItemDetailsOld = require('../controllers/invoice/postUpdateBillItemDetailsOld')
const updateBulkInvoiceItemKart = require('../controllers/invoice/updateBulkInvoiceItemKart')
const getPrintedInvoice = require('../controllers/invoice/getPrintedInvoice')
const invoiceRouter = express.Router()

invoiceRouter
.get('/getinvoices',getInvoice) 
.get('/getinvoicesForPatient',getInvoiceforOnePatient) 
.get('/getBillItemDetails',getBillItemDetails)
.post('/updateBillItemDetails',postUpdateBillItemDetailsOld)
.post('/saveTempInvoicetoConfirm',postSaveTempInvoicetoConfirm) 
.post('/createTempNewInvoice',postCreateTempNewInvoice)  
.delete('/deleteItemFromKart',deleteItemFromKart)
.post('/updateEstimateItemstoKart',postUpdateBillItemDetails)
.get('/getPrintedInvoice/:clientId/:invoiceId',getPrintedInvoice) //for pdf generation
.post('/updateBulkBillItemDetails',updateBulkInvoiceItemKart) //for updating in bulk



module.exports = invoiceRouter