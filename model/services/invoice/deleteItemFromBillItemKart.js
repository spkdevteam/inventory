const { default: mongoose } = require("mongoose");
const { getClientDatabaseConnection } = require("../../connection");
const invoiceDetailsSchema = require("../../invoice");

const deleteItemFromBillItemKart = async ({ invoiceId, billKartId,clientId }) => {
  try {
    console.log(invoiceId, billKartId, 'invoiceId, billKartId');

    if (!invoiceId || !billKartId) {
      throw new Error('Invoice ID and Bill Kart ID are required');
    }

    const db = await getClientDatabaseConnection(clientId);
    const Invoice = db.model('invoice', invoiceDetailsSchema);

    const result = await Invoice.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(invoiceId) },
      { $pull: { itemKart: { _id: new mongoose.Types.ObjectId(billKartId) } } },
      { new: true }
    );
    console.log(result,'---------->>>>>>>>>>>>>>>')

    if (!result) {
      return { success: false, message: 'Item or invoice not found' };
    }

    return {
      success: true,
      message: 'Item removed successfully',
      updatedInvoice: result,
    };
  } catch (error) {
    console.error('Error deleting item from bill item kart:', error.message);
    return { success: false, message: 'An error occurred while deleting the item' };
  }
};
module.exports = deleteItemFromBillItemKart