const invoices = require("../../model/contants")


const getBillItemDetails = (req, res) => {
    try {
        const { billNumber } = req.query
        const result = invoices.filter((val, index) => val?.invoiceDetails?._id == billNumber)[0] || []
        const itemDetails = result?.itemDetails
        const count = itemDetails?.length
        res.json({ data: { currentData: itemDetails, totalDataCount: count } })
    } catch (error) {

    }
}

module.exports = getBillItemDetails