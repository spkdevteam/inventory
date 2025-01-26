const { getClientDatabaseConnection } = require("../../db/connection");
const serialNumebrSchema = require("../../serialNumber");
 

 

const getserialNumber = async (collection,clientId,branchPrefix,buprefix) => {
    try {
        console.log(collection,clientId,branchId,buid,'collection,clientId,branchId,buid')
        const db = await getClientDatabaseConnection(clientId);
        const serialNumber =await db.model('serialNumber',serialNumebrSchema)
        const result = await serialNumber.findOneAndUpdate({ collectionName: collection }, { $inc: { nextNum: 1 } })
        
        if (result) {
            console.log('xxx',buprefix +'-'+branchPrefix+'-'+ new Date().toISOString()?.split('T')[0]?.split('-')[3] + '-' +  result.prefix + result.nextNum)
            return buprefix +'-'+branchPrefix+'-'+ new Date().toISOString()?.split('T')[0]?.split('-')[3] + '-' +  result.prefix + result.nextNum
        }
        else {
            return null
        }
    } catch (error) {
        return null
    }
}


module.exports = getserialNumber