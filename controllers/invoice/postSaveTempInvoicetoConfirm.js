const { v4: uuidv4 } = require('uuid'); // Import a UUID generator for generating display IDs (optional)
const updateInvoiceDisplayId = require('../../model/services/invoice/saveInvoice');

// Controller to handle saving temporary invoices and confirming them
const postSaveTempInvoicetoConfirm = async (req, res, next) => {
    try {
        /*
        Takes the bill summary from the client and updates the server. If no display ID is generated, 
        it generates a new unique display ID and includes it in the response.
        */
       console.log(req.body)

        const data = req.body; // Extract data from request body
        console.log(req.body,'billSummarybillSummarybillSummary')
        console.log({clientId:data?.clientId, invoiceId:data?.billSummary?._id,prefix:data?.billSummary?.supplierDetails?.displayId?.split('-')?.slice(0,2)?.join('-')})
        const result = await updateInvoiceDisplayId({clientId:data?.clientId, invoiceId:data?.billSummary?._id,prefix:data?.billSummary?.supplierDetails?.displayId?.split('-')?.slice(0,2)?.join('-')})
        // Placeholder logic to generate a new display ID if it doesn't exist
        console.log(result,'resultres>?<<<<<<<<<<<<>>>>>>>>>>>>tresultresult')
        // Constructing the response object
        const responce = {
            status: true,
            message: 'Temporary invoice saved successfully.',
            data: {
                result 
            },
        };

        // Sending response back to the client
        res.status(200).json(responce);
    } catch (error) {
        // Handle errors gracefully
        next(error); // Pass the error to the next middleware for centralized error handling
    }
};

module.exports = postSaveTempInvoicetoConfirm;
