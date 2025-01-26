const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');
const getserialNumber = require('../serialNumber/getserialNumber');

const updateInvoiceDisplayId = async ({clientId, invoiceId,prefix}) => {
  try {
    if (!clientId || !invoiceId) {
      throw new Error('Client ID and Invoice ID are required');
    }

    const db = await getClientDatabaseConnection(clientId);
    const Invoice = await db.model('invoice', invoiceDetailsSchema);

    // Fetch the existing invoice
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    // Check if displayId already exists
    if (invoice.invoiceDetails.displayId) {
      return invoice; // Return the existing document as it is
    }

    // Generate a new displayId
    const newDisplayId =await getserialNumber('invoice',clientId,prefix)

    // Update the displayId in the database
    invoice.invoiceDetails.displayId = newDisplayId;
    const updatedInvoice = await invoice.save();

    return updatedInvoice;
  } catch (error) {
    console.error('Error updating invoice displayId:', error.message);
    throw error; // Rethrow the error after logging it
  }
};

module.exports = updateInvoiceDisplayId;
