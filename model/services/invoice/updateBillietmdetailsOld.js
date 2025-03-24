const { default: mongoose } = require('mongoose');
const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');

const updateBillietmdetailsOld = async (input) => {
  try {
    const { clientId, invoice_id, BilledItemDetails } = input;

    if (!clientId) {
      return { status: false, message: 'Client ID is required', statusCode: 400 };
    }

    if (!invoice_id) {
      return { status: false, message: 'Invoice ID is required', statusCode: 400 };
    }

    if (!BilledItemDetails) {
      return { status: false, message: 'Billed Item Details are required', statusCode: 400 };
    }

    // Connect to the client database
    const db = await getClientDatabaseConnection(clientId);
    const Invoice = await db.model('invoice', invoiceDetailsSchema);

    // Find the invoice by ID
    const existingInvoice = await Invoice.findById(invoice_id);
    if (!existingInvoice) {
      return { status: false, message: 'Invoice not found', statusCode: 404 };
    }

    // Ensure _id is generated if not provided
    if (!BilledItemDetails._id) {
      BilledItemDetails._id = new mongoose.Types.ObjectId();
    }

    // Check if BilledItemDetails already exists in itemKart
    const itemIndex = existingInvoice.itemKart.findIndex(
      (item) => item._id && item._id.toString() === BilledItemDetails._id.toString()
    );

    if (itemIndex >= 0) {
      // If item exists, update it
      existingInvoice.itemKart[itemIndex] = {
        ...existingInvoice.itemKart[itemIndex]._doc,
        ...BilledItemDetails,
      };
    } else {
      // If item does not exist, add it as a new embedded document
      existingInvoice.itemKart.push(BilledItemDetails);
    }

    // Update tax details and total amount
    const itemKart = existingInvoice.itemKart;

    // Calculate tax details and total amount
    const taxDetails = {
      totalTaxableValue: 0,
      totalCGST: 0,
      totalSGST: 0,
      totalIGST: 0,
      totalCess: 0,
       
    };
    let totalDiscount =0

    let totalValue = 0;

    itemKart.forEach((item) => {
      const { taxableValue = 0, cgst = 0, sgst = 0, igst = 0, total = 0,discount=0 } = item;

      taxDetails.totalTaxableValue += taxableValue;
      taxDetails.totalCGST += cgst;
      taxDetails.totalSGST += sgst;
      taxDetails.totalIGST += igst;
      
      
      totalDiscount += discount;
      totalValue += total;
    });

    const totalAmount = {
      totalValue: totalValue,
      inWords: convertToWords(totalValue), // A utility function to convert numbers to words
    };

    // Assign updated values to the invoice
    existingInvoice.taxDetails = taxDetails;
    existingInvoice.totalAmount = totalAmount;
    existingInvoice.discount = totalDiscount;

    // Save the updated invoice
    const updatedInvoice = await existingInvoice.save();
    console.log(updatedInvoice,'updatedInvoiceupdatedInvoiceupdatedInvoiceupdatedInvoiceupdatedInvoice')
    return {
      status: true,
      message: 'Invoice updated successfully',
      data: updatedInvoice,
    };
  } catch (error) {
    console.error('Error updating invoice itemKart:', error.message);
    return { status: false, message: error.message, statusCode: 500 };
  }
};

// Utility function to convert numbers to words (simplified for example purposes)
const convertToWords = (num) => {
  // Implement your own number-to-words conversion logic or use a library
  if (num === 0) return 'Zero Only';
  return `${num.toFixed(2)} Only`; // Example output: "1234.56 Only"
};

module.exports = updateBillietmdetailsOld;



