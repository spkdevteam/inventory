const getPrintedInvoiceFn = require("../../model/services/invoice/getPrintedInvoiceFn");

const getPrintedInvoice = async (req, res, next) =>{
    try{
        const { clientId,invoiceNo } = req?.params;
        const result = await getPrintedInvoiceFn({clientId,invoiceNo});
        if(result?.status) return res.status(200).json({status : result?.status, message : result?.message, data : result?.data});

    }
    catch(error){
        next(error);
    }
}

module.exports = getPrintedInvoice