const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');

const fetchItemKart = async (input) => {
  try {
    const { clientId, buId, billNumber } = input;

    // Validate required inputs
    if (!clientId) {
      return { status: false, message: 'Client ID is required', data: [], statusCode: 400 };
    }
    if (!buId) {
      return { status: false, message: 'Business Unit ID is required', data: [], statusCode: 400 };
    }
    if (!billNumber) {
      return { status: false, message: 'Bill Number is required', data: [], statusCode: 400 };
    }

    // Connect to the client's database
    const db = await getClientDatabaseConnection(clientId);
    const Invoice = await db.model('invoice', invoiceDetailsSchema);

    // Find the invoice by buId and billNumber
    const invoice = await Invoice.findOne({ _id:billNumber });
    if (!invoice) {
      return { status: true, message: 'Invoice not found', data: [], statusCode: 404 };
    }

    // Return the itemKart array or an empty array if not present
    const itemKart = invoice.itemKart || [];
    return { status: true, message: 'ItemKart fetched successfully', data: itemKart, statusCode: 200 };
  } catch (error) {
    console.error('Error fetching itemKart:', error.message);
    return { status: false, message: error.message, data: [], statusCode: 500 };
  }
};

module.exports = fetchItemKart;
