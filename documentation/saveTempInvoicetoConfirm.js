/**
 * @swagger
 * /invoice/saveTempInvoicetoConfirm:
 *   post:
 *     summary: Save Temporary Invoice to Confirm
 *     description: This API saves a temporary invoice to confirm, converting it into a finalized state.
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
 *                 description: The ID of the client making the request.
 *                 example: "cl12345"
 *               buId:
 *                 type: string
 *                 description: The business unit ID associated with the client.
 *                 example: "bu67890"
 *               invoice_id:
 *                 type: string
 *                 description: The ID of the temporary invoice to confirm.
 *                 example: "inv98765"
 *     responses:
 *       200:
 *         description: Successfully saved and confirmed the temporary invoice.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Temporary invoice successfully confirmed."
 *               data:
 *                 invoiceId: "inv98765"
 *                 displayId: "DISP1234"
 *       400:
 *         description: Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide all required fields."
 *       404:
 *         description: Temporary invoice not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invoice not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error occurred."
 */
