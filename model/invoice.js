const mongoose = require('mongoose');

const billedItemSchema = new mongoose.Schema({
  itemName: String,
  hsnSacCode: String,
  quantity: Number,
  discount: Number,
  unitPrice: Number,
  taxableValue: Number,
  cgst: Number,
  sgst: Number,
  igst: Number,
  total: Number,
}, { _id: true }); // Ensure each item gets an _id field

const invoiceDetailsSchema = new mongoose.Schema({
  invoiceDetails: {
    displayId: { type: String, default: null },
    invoiceDate: { type: Date, required: true },
    _id: { type: String, default: null },
  },
  supplierDetails: {
    name: { type: String, required: true },
    gstin: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    displayId: { type: String, required: true },
  },
  recipientDetails: {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    displayId: { type: String, required: true },
  },
  reverseCharge: { type: Boolean, default: false },
  taxDetails: {
    totalTaxableValue: { type: Number, default: 0 },
    totalCGST: { type: Number, default: 0 },
    totalSGST: { type: Number, default: 0 },
    totalIGST: { type: Number, default: 0 },
    totalCess: { type: Number, default: 0 },
  },
  totalAmount: {
    totalValue: { type: Number, default: 0 },
    inWords: { type: String, default: 'Zero Only' },
  },
  netAmount: {
    totalValue: { type: Number, default: 0 },
    inWords: { type: String, default: 'Zero Only' },
  },
  itemKart: { type: [billedItemSchema], default: [] }, // Embedded schema
  discount: { type: Number, default: 0 },
  signature: { type: String, default: null },
  createdBy: { type: String, default: null },
});

const Invoice = mongoose.model('Invoice', invoiceDetailsSchema);

module.exports = invoiceDetailsSchema;
