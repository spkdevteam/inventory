const reverseSaveTempInvoicetoConfirmFn = require("../../model/services/invoice/reverseSaveTempInvoicetoConfirmFn");

//controller
const reverseSaveTempInvoicetoConfirm = async (req, res, next) => {//clientId displayId 
    try {
        console.log(" req.body===>>", req.body)
        const data = req.body;
        const user = req?.user;
        const result = await reverseSaveTempInvoicetoConfirmFn({ invoiceId : data?.invoiceId, clientId: data?.clientId, displayId: data?.displayId, prefix: data?.displayId?.split('-')?.slice(0, 2)?.join('-'), deletedByUserId: user?._id });
        const responce = {
            status: true,
            message: 'Invoice deleted successfully',
            data: {
                updatedInvoice : result?.updatedInvoice,
                debitNumber : result?.debitNumber
            },
        };
        // Sending response back to the client
        res.status(200).json(responce);
    }
    catch (error) {
        next(error);
    }
}

module.exports = reverseSaveTempInvoicetoConfirm