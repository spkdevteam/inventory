const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');
const getserialNumber = require('../serialNumber/getserialNumber');

const createOrUpdateInvoice = async (input) => {
  try {
    const invoiceData = input?.invoiceDetails;
    console.log(invoiceData,'*******************************************')
    if (!input?.clientId) return { status: false, message: 'Database connection details not found', statusCode: 404 };

    const db = await getClientDatabaseConnection(input?.clientId);
    const Invoice = await db.model('invoice', invoiceDetailsSchema);

    // Input validation
    if (!invoiceData || typeof invoiceData !== 'object') {
      throw new Error('Invalid input data');
    }

    const { invoiceDetails, supplierDetails, recipientDetails, taxDetails, totalAmount, netAmount } = invoiceData;

    // Validate required fields (similar validation as before)
    if (!invoiceDetails || !invoiceDetails.invoiceDate) {
      throw new Error('Invoice date is required');
    }
    if (!supplierDetails || !supplierDetails.name  || !supplierDetails.email) {
      throw new Error('Supplier details are incomplete');
    }
    if (!recipientDetails || !recipientDetails.name || !recipientDetails.email) {
      throw new Error('Recipient details are incomplete');
    }
    if (!taxDetails || typeof taxDetails.totalTaxableValue !== 'number' || taxDetails.totalTaxableValue < 0) {
      throw new Error('Invalid tax details');
    }
    if (!totalAmount || typeof totalAmount.totalValue !== 'number') {
      throw new Error('Invalid totalAmount');
    }
    if (!netAmount || typeof netAmount.totalValue !== 'number') {
      throw new Error('Invalid netAmount');
    }

    let existingInvoice = null;

    // Check if invoice ID exists
    if (invoiceDetails && invoiceDetails._id) {
      existingInvoice = await Invoice.findById(invoiceDetails._id);
    }
    console.log(existingInvoice,'existingInvoiceexistingInvoiceexistingInvoiceexistingInvoice')

    // Check for a record with matching supplierDetails._id, recipientDetails._id, and null displayId
    if (!existingInvoice && invoiceDetails?.displayId === null) {
      existingInvoice = await Invoice.findOne({
        'supplierDetails._id': supplierDetails._id,
        'recipientDetails._id': recipientDetails._id,
        'invoiceDetails.displayId': null,
      });
    }

    if (existingInvoice) {
      // If invoice exists, return the existing document as a response
      return existingInvoice;
    } else {
      // If no existing document matches, create a new record
      const newInvoice = new Invoice({
        invoiceDetails: {
          displayId: invoiceDetails.displayId || null,
          invoiceDate: new Date(invoiceDetails.invoiceDate),
          _id: invoiceDetails._id || null,
        },
        supplierDetails: {
          name: supplierDetails.name,
          gstin: supplierDetails.gstin,
          address: supplierDetails.address,
          email: supplierDetails.email,
          phone: supplierDetails.phone,
          _id: supplierDetails._id,
          displayId: supplierDetails.displayId,
        },
        recipientDetails: {
          name: recipientDetails.name,
          lastName: recipientDetails.lastName,
          email: recipientDetails.email,
          phone: recipientDetails.phone,
          _id: recipientDetails._id,
          displayId: recipientDetails.displayId,
        },
        reverseCharge: invoiceData.reverseCharge || false,
        taxDetails: {
          totalTaxableValue: taxDetails.totalTaxableValue || 0,
          totalCGST: taxDetails.totalCGST || 0,
          totalSGST: taxDetails.totalSGST || 0,
          totalIGST: taxDetails.totalIGST || 0,
          totalCess: taxDetails.totalCess || 0,
        },
        totalAmount: {
          totalValue: totalAmount.totalValue || 0,
          inWords: totalAmount.inWords || 'Zero Only',
        },
        netAmount: {
          totalValue: netAmount.totalValue || 0,
          inWords: netAmount.inWords || 'Zero Only',
        },
        itemKart: invoiceData.itemKart || [],
        discount: invoiceData.discount || 0,
        signature: invoiceData.signature || null,
        createdBy: invoiceData.createdBy || null,
      });

      // Save the new invoice
      const savedInvoice = await newInvoice.save();
      return savedInvoice;
    }
  } catch (error) {
    console.error('Error creating or updating invoice:', error.message);
    throw error; // Rethrow the error after logging it
  }
};

module.exports = createOrUpdateInvoice;
