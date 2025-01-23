/**
 * @swagger
 * /invoice/getInvoices:
 *   get:
 *     summary: Retrieve a list of invoices
 *     description: Fetches a paginated list of invoices based on the provided search parameters.
 *     tags:
 *       - Invoice
 *     parameters:
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: A keyword to search invoices by details such as client name or invoice number.
 *         example: "client123"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number for pagination.
 *         example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: The number of items per page for pagination.
 *         example: 10
 *     responses:
 *       200:
 *         description: A list of invoices retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Invoices retrieved successfully."
 *               data:
 *                 invoices:
 *                   - invoiceId: "INV001"
 *                     clientName: "Client A"
 *                     amount: 1500.00
 *                     issueDate: "2024-12-01T00:00:00Z"
 *                     dueDate: "2025-01-01T00:00:00Z"
 *                   - invoiceId: "INV002"
 *                     clientName: "Client B"
 *                     amount: 2500.00
 *                     issueDate: "2024-11-30T00:00:00Z"
 *                     dueDate: "2024-12-30T00:00:00Z"
 *                 pagination:
 *                   currentPage: 1
 *                   perPage: 10
 *                   totalItems: 20
 *                   totalPages: 2
 *       400:
 *         description: Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide valid query parameters."
 *       404:
 *         description: No invoices found for the specified criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No invoices found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
