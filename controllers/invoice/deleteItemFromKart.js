 

const deleteItemFromBillItemKart = require("../../model/services/invoice/deleteItemFromBillItemKart")
const getInvoiceList = require("../../model/services/invoice/getInvoicePagination")


const deleteItemFromKart = async (req,res,next)=>{
    try {
        const {invoiceId,billKartId,clientId} = req.query
        console.log(invoiceId,billKartId,clientId,req.query,'my Data ')
        const result = await deleteItemFromBillItemKart({invoiceId,billKartId,clientId})
         
        console.log(result)
        res.json(result)  
    } catch (error) {
        next(error)
    }
}

module.exports = deleteItemFromKart