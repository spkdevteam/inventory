const { default: mongoose } = require('mongoose');
const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');

const updateBulkInvoiceItemKartFn = async (input) => {
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
        //starting to loop over BilledItemDetails
        for (const BilledItemDetailsEachElement of BilledItemDetails) {
            // Ensure _id is generated if not provided
            if (!BilledItemDetailsEachElement._id) {
                BilledItemDetailsEachElement._id = new mongoose.Types.ObjectId();
            }

            // Check if BilledItemDetailsEachElement already exists in itemKart
            const itemIndex = existingInvoice.itemKart.findIndex(
                (item) => item._id && item._id.toString() === BilledItemDetailsEachElement._id.toString()
            );

            if (itemIndex >= 0) {
                // If item exists, update it:
                existingInvoice.itemKart[itemIndex].itemName = BilledItemDetailsEachElement?.serviceName;
                existingInvoice.itemKart[itemIndex].itemId = BilledItemDetailsEachElement?.serviceId ? BilledItemDetailsEachElement?.serviceId : null;
                existingInvoice.itemKart[itemIndex].estimateNumber = BilledItemDetailsEachElement?.estimateNumber ? BilledItemDetailsEachElement?.estimateNumber : [];
                existingInvoice.itemKart[itemIndex].quantity = BilledItemDetailsEachElement?.quantity;
                existingInvoice.itemKart[itemIndex].discount = BilledItemDetailsEachElement?.discount && parseInt(BilledItemDetailsEachElement?.discount, 10);
                existingInvoice.itemKart[itemIndex].unitPrice = BilledItemDetailsEachElement?.unitPrice && parseInt(BilledItemDetailsEachElement?.unitPrice, 10);
                existingInvoice.itemKart[itemIndex].taxableValue = BilledItemDetailsEachElement?.taxableValue && parseInt(BilledItemDetailsEachElement?.taxableValue, 10);
                existingInvoice.itemKart[itemIndex].description = BilledItemDetailsEachElement?.toothArray ? JSON.stringify(BilledItemDetailsEachElement?.toothArray) : "";
                existingInvoice.itemKart[itemIndex].quotation_number = '';
                existingInvoice.itemKart[itemIndex].cgst = BilledItemDetailsEachElement?.cgst ? parseInt(BilledItemDetailsEachElement?.cgst, 10) : 0;
                existingInvoice.itemKart[itemIndex].sgst = BilledItemDetailsEachElement?.sgst ? parseInt(BilledItemDetailsEachElement?.sgst, 10) : 0;
                existingInvoice.itemKart[itemIndex].igst = BilledItemDetailsEachElement?.igst ? parseInt(BilledItemDetailsEachElement?.igst, 10) : 0;
                existingInvoice.itemKart[itemIndex].total = BilledItemDetailsEachElement?.total ? parseInt(BilledItemDetailsEachElement?.total, 10) : 0;
                // existingInvoice.itemKart[itemIndex] = {
                //   ...existingInvoice.itemKart[itemIndex]._doc,
                //   ...BilledItemDetailsEachElement,
                // };
            } else {
                // If item does not exist, add it as a new embedded document
                const newItem = {
                    itemName: BilledItemDetailsEachElement?.serviceName,
                    itemId: BilledItemDetailsEachElement?.serviceId ? BilledItemDetailsEachElement?.serviceId : null,
                    estimateNumber: BilledItemDetailsEachElement?.estimateNumber ? BilledItemDetailsEachElement?.estimateNumber : [],
                    quantity: BilledItemDetailsEachElement?.quantity,
                    discount: BilledItemDetailsEachElement?.discount && parseInt(BilledItemDetailsEachElement?.discount, 10),
                    unitPrice: BilledItemDetailsEachElement?.unitPrice && parseInt(BilledItemDetailsEachElement?.unitPrice, 10),
                    taxableValue: BilledItemDetailsEachElement?.taxableValue && parseInt(BilledItemDetailsEachElement?.taxableValue, 10),
                    description: BilledItemDetailsEachElement?.toothArray ? JSON.stringify(BilledItemDetailsEachElement?.toothArray) : "",
                    quotation_number: '',
                    cgst: BilledItemDetailsEachElement?.cgst ? parseInt(BilledItemDetailsEachElement?.cgst, 10) : 0,
                    sgst: BilledItemDetailsEachElement?.sgst ? parseInt(BilledItemDetailsEachElement?.sgst, 10) : 0,
                    igst: BilledItemDetailsEachElement?.igst ? parseInt(BilledItemDetailsEachElement?.igst, 10) : 0,
                    total: BilledItemDetailsEachElement?.total ? parseInt(BilledItemDetailsEachElement?.total, 10) : 0,
                    _id: BilledItemDetailsEachElement?._id.toString()
                };
                existingInvoice.itemKart.push(newItem);
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
            let totalDiscount = 0

            let totalValue = 0;

            itemKart.forEach((item) => {
                const { taxableValue = 0, cgst = 0, sgst = 0, igst = 0, total = 0, discount = 0 } = item;

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
        }
        // Save the updated invoice
        const updatedInvoice = await existingInvoice.save();
        console.log(updatedInvoice, 'updatedInvoiceupdatedInvoiceupdatedInvoiceupdatedInvoiceupdatedInvoice')
        if (!updatedInvoice) return { status: false, message: "Couldn't update Invoice!!", data: [] }
        return {
            status: true,
            message: 'Invoice updated successfully',
            data: updatedInvoice,
        };
    } catch (error) {
        console.error('Error updating invoice itemKart:', error.message);
        return { status: false, message: error.message, statusCode: 500 };
    }
}

// Utility function to convert numbers to words (simplified for example purposes)
const convertToWords = (num) => {
    // Implement your own number-to-words conversion logic or use a library
    if (num === 0) return 'Zero Only';
    return `${num.toFixed(2)} Only`; // Example output: "1234.56 Only"

}

module.exports = updateBulkInvoiceItemKartFn