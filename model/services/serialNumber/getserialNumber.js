// const { getClientDatabaseConnection } = require("../../db/connection");
const { getClientDatabaseConnection } = require("../../connection");
const serialNumebrSchema = require("../../serialNumber");
 

 

const getserialNumber = async (collection,clientId,prefix) => {
    try {
        console.log(collection,clientId,prefix,'collection,clientId,prefix')
        const db = await getClientDatabaseConnection(clientId);
        const serialNumber =await db.model('serialNumber',serialNumebrSchema)
        const result = await serialNumber.findOneAndUpdate({ collectionName: collection }, { $inc: { nextNum: 1 } })
        if (result) {
            return prefix+'-'+ new Date().toISOString()?.split('T')[0]?.split('-')[0] + '-' +  result.prefix + result.nextNum
        }
        else {
            return null
        }
    } catch (error) {
        return null
    }
}


module.exports = getserialNumber