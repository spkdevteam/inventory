import { getClientDatabaseConnection } from "../connection"




function getAllusersByBranch({ clientId, branchId }) {

    const db = getClientDatabaseConnection(clientId)
    const Transaction = db.model('Transaction', transactionSchema)
    const result = Transaction.find({})
    return {
        status: true, message: 'result fetched Succefull ', data: [{
            userName: 'sandeep',
            secondName: 'pachat',
            phone: '79048322123'
        },
        {
            userName: 'sandeep',
            secondName: 'pachat',
            phone: '79048322123'
        },
        {
            userName: 'sandeep',
            secondName: 'pachat',
            phone: '79048322123'
        }]
    }
}