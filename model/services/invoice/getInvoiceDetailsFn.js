const { default: mongoose } = require('mongoose');
const { getClientDatabaseConnection } = require('../../connection');
const invoiceDetailsSchema = require('../../invoice');
const getInvoiceDetailsFn = async ({ from_Date = null, toDate = null, clientId, SearchKey = "", page = null, perPage = null,
    createdBy, updatedBy, buId, branchId, patientId }) => {
    try {
        let searchQuery = {};
        if (SearchKey) {
            if (SearchKey.trim()) {
                const words = SearchKey.trim().split(/\s+/)//spiltting by space
                    .map(word =>
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special characters
                    );
                // const escapedSearchKey = SearchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => {
                        const numWord = Number(word); // Convert word to number
                        const boolWord = word.toLowerCase() === "true" ? true : word.toLowerCase() === "false" ? false : null; // Convert word to Boolean
                        const dateWord = !isNaN(Date.parse(word)) ? new Date(word) : null; // Convert to Date if valid
                        return [//case insensitive searching and searching from anywhere of the target field
                            { "invoiceDetails.displayId": { $regex: word, $options: "i" } },
                            { "supplierDetails.name": { $regex: word, $options: "i" } },
                            { "supplierDetails.gstin": { $regex: word, $options: "i" } },
                            { "supplierDetails.address": { $regex: word, $options: "i" } },
                            { "supplierDetails.email": { $regex: word, $options: "i" } },
                            { "supplierDetails.phone": { $regex: word, $options: "i" } },
                            { "supplierDetails.displayId": { $regex: word, $options: "i" } },
                            { "recipientDetails.name": { $regex: word, $options: "i" } },
                            { "recipientDetails.lastName": { $regex: word, $options: "i" } },
                            { "recipientDetails.email": { $regex: word, $options: "i" } },
                            { "recipientDetails.phone": { $regex: word, $options: "i" } },
                            { "recipientDetails.displayId": { $regex: word, $options: "i" } },
                            { "totalAmount.inWords": { $regex: word, $options: "i" } },
                            { "netAmount.inWords": { $regex: word, $options: "i" } },
                            { "signature": { $regex: word, $options: "i" } },
                            { "debitNoteNumber": { $regex: word, $options: "i" } },
                            ...(isNaN(numWord) ? [] : [
                                { "taxDetails.totalTaxableValue": numWord },
                                { "taxDetails.totalCGST": numWord },
                                { "taxDetails.totalSGST": numWord },
                                { "taxDetails.totalIGST": numWord },
                                { "taxDetails.totalCess": numWord },
                                { "taxDetails.totalValue": numWord },
                                { "netAmount.totalValue": numWord },
                                { discount: numWord },
                            ]), // Only add age condition if word is a valid number
                            ...(boolWord === null ? [] : [
                                { reverseCharge: boolWord },
                            ]), // Only add Boolean conditions if the word is "true" or "false"
                            ...(dateWord === null ? [] : [
                                { "invoiceDetails.invoiceDate": dateWord }, // Exact match
                            ])
                        ]
                    })
                }
            }
        }
        console.log("searchQuery=>>>", searchQuery);
        console.log("searchQuery=>>>", searchQuery);
        //
        let dateSearchKey = {};

        if (from_Date || toDate) {
            dateSearchKey.createdAt = {};

            if (from_Date) {
                dateSearchKey.createdAt.$gte = new Date(from_Date);
            }
            if (toDate) {
                dateSearchKey.createdAt.$lte = new Date(toDate);
            }
        }

        let buIdSearchKey = {};

        let branchSearchKey = {};
        if(branchId){
            branchSearchKey = {'supplierDetails._id': branchId}
        }

        let patientIdSearchKey = {};
        if(patientId){
            patientIdSearchKey = {'recipientDetails._id': patientId}
        }

        
        //
        // let from_DateSearchKey = {};
        // if (from_Date) {
        //     from_DateSearchKey = {
        //         createdAt: { $gte: new Date(from_Date) }
        //     }
        // }
        // let toDateSearchKey = {};
        // if (toDate) {
        //     toDateSearchKey = {
        //         createdAt: { $lte: new Date(toDate) }
        //     }
        // }
        //establishing db connection :
        const db = await getClientDatabaseConnection(clientId);
        const invoiceModel = await db.model('Invoice', invoiceDetailsSchema);
        //filterings:
        let createdBySearchKey = {};
        if (createdBy) {
            createdBySearchKey = { createdBy: createdBy }
        }
        let updatedBySearchKey = {};
        if (updatedBy) {
            updatedBySearchKey = { updatedBy: updatedBy }
        }
        let query = invoiceModel.find({
            ...searchQuery,
            // ...from_DateSearchKey,
            // ...toDateSearchKey,
            ...dateSearchKey,
            ...branchSearchKey,
            ...patientIdSearchKey,
            ...createdBySearchKey,
            ...updatedBySearchKey,
            deletedAt: null
        });
        const totalDocs = await invoiceModel.countDocuments({
            ...searchQuery,
            // ...from_DateSearchKey,
            // ...toDateSearchKey,
            ...dateSearchKey,
            ...branchSearchKey,
            ...patientIdSearchKey,
            ...createdBySearchKey,
            ...updatedBySearchKey,
            deletedAt: null
        });
        console.log("totalDocs==>>>", totalDocs);
        const paginationObj = {};
        if (page && perPage) {
            // convert page and perPage to numbers
            paginationObj.pageNumber = parseInt(page, 10);
            paginationObj.perPageNumber = parseInt(perPage, 10);
            if (paginationObj.pageNumber <= 0 || paginationObj.pageNumber >= 500) return { status: false, message: "Invalid page number" };
            if (paginationObj.perPageNumber <= 0 || paginationObj.perPageNumber >= 500) return { status: false, message: "Invalid per page number" };
            paginationObj.skip = (paginationObj.pageNumber - 1) * paginationObj.perPageNumber;
            query = query.limit(paginationObj?.perPageNumber).skip(paginationObj?.skip);
        }
        const fetchedInvoice = await query;
        console.log("fetchedInvoice=>>>", fetchedInvoice);
        if (!fetchedInvoice) return { status: false, data:[], metaData:{}, message: "Invoices can't be fetched!!" };

        let metaData = {};
        if (page && perPage) {
            const totalPages = Math.ceil(totalDocs / paginationObj?.perPageNumber);
            metaData = {
                currentPage: paginationObj?.pageNumber,
                perPage: paginationObj?.perPageNumber,
                SearchKey,
                totalDocs,
                totalPages,
            }
            if (fetchedInvoice?.length > 0)
                return { status: true, data: fetchedInvoice, metaData: metaData, message: "Invoices details retrieved successfully." }
            else
                return { status: false, data: [], metaData: metaData, message: "Invoices details Not Found!" }
        }
        else {
            metaData = {
                currentPage: 1,
                perPage: totalDocs,
                SearchKey,
                totalDocs,
                totalPages: 1,
            }

            if (fetchedInvoice?.length > 0)
                return { status: true, data: fetchedInvoice, metaData: metaData, message: "Invoices details retrieved successfully." }
            else
                return { status: false, data: [], metaData: metaData, message: "Invoices details Not Found!" }
        }
    }
    catch (error) {
        console.error("Invoices can't be fetched!!", error.message);
        return { status: false, message: error.message, statusCode: 500 };
    }
}

module.exports = getInvoiceDetailsFn