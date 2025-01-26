const { v4: uuidv4 } = require('uuid'); // Import a UUID generator for generating display IDs (optional)

// Controller to handle saving temporary invoices and confirming them
const postSaveTempInvoicetoConfirm = (req, res, next) => {
    try {
        /*
        Takes the bill summary from the client and updates the server. If no display ID is generated, 
        it generates a new unique display ID and includes it in the response.
        */
       console.log(req.body)

        const { billSummary } = req.body; // Extract data from request body

        // Placeholder logic to generate a new display ID if it doesn't exist
        const generatedDisplayId = billSummary?.displayId || `DISP-${uuidv4()}`;

        // Constructing the response object
        const result = {
            status: true,
            message: 'Temporary invoice saved successfully.',
            data: {
                ...billSummary,
                displayId: generatedDisplayId, // Attach the generated or existing display ID
            },
        };

        // Sending response back to the client
        res.status(200).json(result);
    } catch (error) {
        // Handle errors gracefully
        next(error); // Pass the error to the next middleware for centralized error handling
    }
};

module.exports = postSaveTempInvoicetoConfirm;
