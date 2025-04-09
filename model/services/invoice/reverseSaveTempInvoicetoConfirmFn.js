const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');
const getserialNumber = require('../serialNumber/getserialNumber');

const reverseSaveTempInvoicetoConfirmFn = async ({ invoiceId, clientId, displayId, prefix, deletedByUserId }) => {
    try {
        console.log(invoiceId, clientId,"<<<<<<<<<<<<-----------");
        if (!clientId ) {
            throw new Error('Client ID is required');
        }
        const db = await getClientDatabaseConnection(clientId);
        const Invoice = await db.model('invoice', invoiceDetailsSchema);

        // Fetch the existing invoice
        const existingInvoice = await Invoice.findById(invoiceId);
        if (!existingInvoice || existingInvoice?.deletedAt !== null) {
            throw new Error("Invoice not found!!Invoice is either deleted or doesnt't exist");
        }
        // Generate a new debit Note
        const prefix = existingInvoice?.invoiceDetails?.displayId?.split('-')?.slice(0, 2)?.join('-');
        // console.log("prefix is ==>>>>>>",prefix);
        
        if(!prefix){
            throw new Error('Can not generate prefix!!');
        }
        const newDebitNumber = await getserialNumber('invoice', clientId, prefix + '-DBT')
        if(!newDebitNumber){
            throw new Error('Can not generate Debit Note during invoice deletion!!');
        }
        // console.log(newDebitNumber,"<<<<<-----");
        //update doicument with debit Note, deletedAt, deletedBy:
        existingInvoice.debitNoteNumber = newDebitNumber;
        existingInvoice.deletedBy = deletedByUserId;
        existingInvoice.deletedAt = new Date();
        const updatedInvoice = await existingInvoice.save();
        return {updatedInvoice : updatedInvoice, debitNumber :  newDebitNumber};
    }
    catch (error) {
        console.error('Error Deleting invoice:', error.message);
        throw error; // Rethrow the error after logging it
    }

}

module.exports = reverseSaveTempInvoicetoConfirmFn