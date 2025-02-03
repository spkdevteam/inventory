const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');

  
const getInvoiceList = async ({page,perPage,searchKey,clientId,patientId,branchId}) => {
    try {
      const  keyWord     =searchKey;
      console.log(page,perPage,searchKey,clientId,patientId,branchId,'page,perPage,searchKey,clientId,patientId,branchId')
  
      if (!clientId) {
        return res.status(400).json({ message: 'Client ID is required' });
      }
  
      // Establish database connection
      const db = await getClientDatabaseConnection(clientId);
      const Invoice = await db.model('invoice', invoiceDetailsSchema);
  
      // Pagination logic
      const pageNumber = parseInt(page);
      const itemsPerPage = parseInt(perPage);
  
      // Build the filter query
      const filter = {
        ...(keyWord && { $text: { $search: keyWord } }), // Full-text search across all fields if keyWord is provided
        ...(patientId?.length && { 'recipientDetails._id': patientId }),
        ...(branchId?.length && { 'supplierDetails._id': branchId }), 
      };
  
      // Fetch invoices with sorting, filtering, and pagination
      const invoices = await Invoice.find(filter)
        .sort({ displayId: -1 }) // Sort by creation date in descending order
        .skip(pageNumber * itemsPerPage)
        .limit(itemsPerPage)
        .select('-itemDetails'); // Exclude `itemDetails` field
  console.log(invoices,'invoicesinvoicesinvoices')
      // Get total count for pagination
      const totalCount = await Invoice.countDocuments(filter);
  
      return { 
          currentData: invoices,
          totalDataCount: totalCount,
        } ;
    } catch (error) {
      console.error('Error fetching invoices:', error.message);
      
    }
  };
  
  module.exports = getInvoiceList;
  