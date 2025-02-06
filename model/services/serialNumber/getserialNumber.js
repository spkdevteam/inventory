// const { getClientDatabaseConnection } = require("../../db/connection");
const { getClientDatabaseConnection } = require("../../connection");
const serialNumebrSchema = require("../../serialNumber");
 

 
 

const getserialNumber = async (collection, clientId, prefix) => {
    try {
        console.log(collection, clientId, prefix,'collection, clientId, prefi-------------x')
        const db = await getClientDatabaseConnection(clientId);
        const serialNumber = await db.model('serialNumber', serialNumebrSchema)
        const result = await serialNumber.findOneAndUpdate(
            { collectionName: collection, prefix: prefix },
            
              {  $inc: { nextNum: 1 }},
                
              
            
        );

        console.log(result,'ressult from prefic ')
            if (result?.nextNum) {
            console.log( prefix + '-' + new Date().toISOString()?.split('T')[0]?.split('-')[0] + '-' + result.prefix + result.nextNum,' prefix + '-' + new Date().toISOString()?.split([0]?.split('-')[0] + '-' + result.prefix + result.nextNum')
            return prefix +'-'+ result.nextNum
        }
        else {
            const result = await serialNumber?.updateOne(  { collectionName: collection, prefix: prefix },{$set:{ collectionName: collection, prefix: prefix, nextNum: 1000001 }},{upsert:true})
            if(result?.upsertedCount){
                const temp = getserialNumber(collection, clientId, prefix)
                return temp
            }
            
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = getserialNumber