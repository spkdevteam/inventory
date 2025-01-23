const invoices = require("../../model/contants")


const getInvoice = (req,res)=>{
    try {
        const {page,perPage,searchKey} = req.query
        console.log(page,perPage,req.query,'my Data ')
        const result =  invoices.filter((val,index)=>index>=parseInt(page)*parseInt(perPage) && index< parseInt(page+1)*parseInt(perPage)).map((val)=> {delete val.itemDetails; return val})
        const count = invoices?.length
        console.log({data:{currentData:result,totalDataCount:count}})
        res.json({data:{currentData:result,totalDataCount:count}})  
    } catch (error) {
        
    }
}

module.exports = getInvoice