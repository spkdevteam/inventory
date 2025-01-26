const invoices = require("../../model/contants")
const getInvoiceList = require("../../model/services/invoice/getInvoicePagination")


const getInvoice = async (req,res,next)=>{
    try {
        const {page,perPage,searchKey} = req.query
        console.log(page,perPage,req.query,'my Data ')
        const result = await getInvoiceList(req.query)
         
        console.log(result)
        res.json(result)  
    } catch (error) {
        next(error)
    }
}

module.exports = getInvoice