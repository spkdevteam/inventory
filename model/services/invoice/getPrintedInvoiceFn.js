const { default: mongoose } = require('mongoose');
const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');


const getPrintedInvoiceFn = async ({clientId,invoiceNo})=>{
    try{
        if (!clientId) {
            return { status: false, message: 'Client ID is required', statusCode: 400 };
        }

        if (!invoiceNo) {
            return { status: false, message: 'Invoice Number is required', statusCode: 400 };
        }
        // Connect to the client database
        const db = await getClientDatabaseConnection(clientId);
        const Invoice = await db.model('invoice', invoiceDetailsSchema);

        // Find the invoice by ID
        const existingInvoice = await Invoice.findById(invoiceNo);
        if (!existingInvoice) {
            return { status: false, message: 'Invoice not found', statusCode: 404 };
        }
    }
    catch(error){
        console.error('Error updating invoice itemKart:', error.message);
        return { status: false, message: error.message, statusCode: 500 };
    }
}
module.exports = getPrintedInvoiceFn