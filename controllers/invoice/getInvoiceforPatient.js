const invoices = require("../../model/contants")


const getInvoiceforOnePatient = (req,res)=>{
    try {
        const {page,perPage,searchKey,patientId} = req.query
        console.log(page,perPage,req.query,'my Data ')
        const result =  invoices.filter((val,index)=> val.recipientDetails?.displayId == patientId &&  index>=parseInt(page)*parseInt(perPage) && index< parseInt(page+1)*parseInt(perPage)).map((val)=> {delete val.itemDetails; return val})
        const count = invoices?.length
        console.log({data:{currentData:result,totalDataCount:count}})
        res.json({data:{currentData:result,totalDataCount:count}})  
    } catch (error) {
        
    }
}

module.exports = getInvoiceforOnePatient