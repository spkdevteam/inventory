const updateBulkInvoiceItemKartFn = require("../../model/services/invoice/updateBulkInvoiceItemKartFn");

const updateBulkInvoiceItemKart = async (req, res, next) =>{
    try {
        /* 
        Receive the input containing the invoice ID and bill item details. 
        invoice ID could not be null,and the item details will be inserted into the item cart.
        */

        // Capture the input data from the request
        const data = req.body;
        console.log(data)

        // Construct the result object to be sent in the response
        const result = await updateBulkInvoiceItemKartFn(data)
        console.log(result,'-------------->>>>>>>>>>>>>>>>>>>')
        if (result?.status) {
            const responce = {
                status: result?.status,
                message: result?.message,
                data: result?.data
            };

            // Send back the response with the received data
            res.json(responce);
        }
        else {
            res.json( {
                status: result?.status,
                message: result?.message || 'Action failed',
                 
            })
        }
    } catch (error) {
        // Pass any error to the next middleware for handling
        next(error);
    }
}

module.exports = updateBulkInvoiceItemKart