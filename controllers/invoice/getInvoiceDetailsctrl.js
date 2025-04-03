const getInvoiceDetailsFn = require("../../model/services/invoice/getInvoiceDetailsFn");
const sanitizeBody = require("../../utils/sanitizeBody");
const { clientIdValidation, emptyStringValidation, isValidDate, mongoIdValidation } = require("../../utils/validation")
const getInvoiceDetailsctrl = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req?.query);
        console.log("inputData==>>>", data);
        //from_Date, toDate, clientId, SearchKey, page, perPage
        const { from_Date, toDate, clientId, updatedUser, createdUser } = data;
        const validation = [
            clientIdValidation({ clientId }),
            emptyStringValidation({ string: data?.SearchKey, name: "searchKey" }),
        ];
        if (from_Date) {
            validation.push(isValidDate({ value: from_Date }));
        }
        if (toDate) {
            validation.push(isValidDate({ value: toDate }));
        }
        if(createdUser){
            validation.push(mongoIdValidation({_id : createdUser, name : createdUser}))
        }
        if(updatedUser){
            validation.push(mongoIdValidation({_id : updatedUser, name : updatedUser}))
        }
        const error = validation.filter((e) => e && e.status == false);
        if (error.length > 0) return { status: false, message: error.map(e => e.message).join(", ") };
        console.log("here");
        const cleanQuery = {
            page: data.page ? data.page.replace(/^"|"$/g, "") : null, // default to null if missing
            perPage: data.perPage ? data.perPage.replace(/^"|"$/g, "") : null, // default to null
            SearchKey: data.SearchKey ? String(data.SearchKey.replace(/^"|"$/g, "")) : "", // default to empty string
        };
        const { page, perPage, SearchKey } = cleanQuery;
        const result = await getInvoiceDetailsFn({from_Date, toDate, clientId, SearchKey, page, perPage, 
            createdBy : createdUser, updatedBy : updatedUser});
        if(!result?.status) 
        return res.status(200).send({ message: result?.message, status : false})
        return res.status(200).send({ message: result?.message, data: { invoices: result?.data, metaData: result?.metaData }, status: true });
    }
    catch (error) {
        next(error);
    }
}
module.exports = getInvoiceDetailsctrl