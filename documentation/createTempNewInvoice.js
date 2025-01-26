/**
 * @swagger
 * /invoice/createTempNewInvoice:
 *   post:
 *     summary: Create a temporary invoice
 *     description: This API creates a temporary invoice with client, supplier, recipient, tax details, and itemized data. Returns the created invoice's details along with a new ObjectId.
 *     tags:
 *       - Invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: The ID of the client.
 *                 example: "client123"
 *               buId:
 *                 type: string
 *                 description: The business unit ID.
 *                 example: "bu456"
 *               invoiceDetails:
 *                 type: object
 *                 properties:
 *                   invoiceDetails:
 *                     type: object
 *                     properties:
 *                       displayId:
 *                         type: string
 *                         nullable: true
 *                         description: The display ID of the invoice.
 *                         example: null
 *                       invoiceDate:
 *                         type: string
 *                         format: date-time
 *                         description: The date of the invoice.
 *                         example: "2025-01-25T10:00:00Z"
 *                       _id:
 *                         type: string
 *                         nullable: true
 *                         description: The internal ID of the invoice.
 *                         example: null
 *                   supplierDetails:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       lastName:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       gstin:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       address:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                   recipientDetails:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       lastName:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       gstin:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       address:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                   placeOfSupply:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   stateCode:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   reverseCharge:
 *                     type: boolean
 *                     example: false
 *                   taxDetails:
 *                     type: object
 *                     properties:
 *                       totalTaxableValue:
 *                         type: number
 *                         example: 0
 *                       totalCGST:
 *                         type: number
 *                         example: 0
 *                       totalSGST:
 *                         type: number
 *                         example: 0
 *                       totalIGST:
 *                         type: number
 *                         example: 0
 *                       totalCess:
 *                         type: number
 *                         example: 0
 *                   totalAmount:
 *                     type: object
 *                     properties:
 *                       totalValue:
 *                         type: number
 *                         example: 0
 *                       inWords:
 *                         type: string
 *                         example: "Zero Only"
 *                   netAmount:
 *                     type: object
 *                     properties:
 *                       totalValue:
 *                         type: number
 *                         example: 0
 *                       inWords:
 *                         type: string
 *                         example: "Zero Only"
 *                   itemKart:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                   discount:
 *                     type: number
 *                     example: 0
 *                   signature:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   createdBy:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *             required:
 *               - clientId
 *               - buId
 *     responses:
 *       200:
 *         description: Temporary invoice created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Temporary invoice created successfully."
 *               data:
 *                 inputDetails:
 *                   clientId: "client123"
 *                   buId: "bu456"
 *                   invoiceDetails:
 *                     invoiceDetails:
 *                       displayId: null
 *                       invoiceDate: "2025-01-25T10:00:00Z"
 *                       _id: null
 *                     supplierDetails:
 *                       name: null
 *                       lastName: null
 *                       gstin: null
 *                       address: null
 *                     recipientDetails:
 *                       firstName: null
 *                       lastName: null
 *                       gstin: null
 *                       address: null
 *                     placeOfSupply: null
 *                     stateCode: null
 *                     reverseCharge: false
 *                     taxDetails:
 *                       totalTaxableValue: 0
 *                       totalCGST: 0
 *                       totalSGST: 0
 *                       totalIGST: 0
 *                       totalCess: 0
 *                     totalAmount:
 *                       totalValue: 0
 *                       inWords: "Zero Only"
 *                     netAmount:
 *                       totalValue: 0
 *                       inWords: "Zero Only"
 *                     itemKart: []
 *                     discount: 0
 *                     signature: null
 *                     createdBy: null
 *                 newObjectId: "64abcdef1234567890abcdef"
 *       400:
 *         description: Bad request. Missing or invalid data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid request body."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
