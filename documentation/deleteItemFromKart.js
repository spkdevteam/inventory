/**
 * @swagger
 * /invoice/deleteItemFromKart:
 *   delete:
 *     summary: Delete an item from the invoice cart
 *     description: Deletes an item from the bill cart of a specific invoice and returns the updated invoice details.
 *     tags:
 *       - Invoice
 *     parameters:
 *       - in: query
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the invoice from which the item is to be removed.
 *         example: "inv12345"
 *       - in: query
 *         name: billKartId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bill cart item to remove.
 *         example: "bk67890"
 *     responses:
 *       200:
 *         description: Successfully updated invoice details.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Item deleted successfully."
 *               data:
 *                 invoiceId: "inv12345"
 *                 updatedInvoiceDetails:
 *                   items:
 *                     - itemId: "item1"
 *                       name: "Item 1"
 *                       quantity: 2
 *                     - itemId: "item2"
 *                       name: "Item 2"
 *                       quantity: 1
 *       400:
 *         description: Invalid input or missing required parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Missing invoiceId or billKartId."
 *       404:
 *         description: Invoice or item not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invoice or bill cart item not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "An error occurred while processing the request."
 */
