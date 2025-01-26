const invoices = require("../../model/contants")
const fetchItemKart = require("../../model/services/invoice/fetchItemKart")


const getBillItemDetails = async (req, res) => {
    try {
        const data = req.query
        const result = await fetchItemKart(data) //.find((invoice) => invoice?.invoiceDetails?._id === billNumber)
        console.log(result,'-------------->>>>>>555555555>>>>>>>>>>>>>')
        if (result?.status) {
            const responce = {
                status: result?.status,
                message: result?.message,
                data: {currentData:result?.data,totalDataCount:result?.data?.length}   
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

    }
}

module.exports = getBillItemDetails