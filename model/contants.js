const invoices = [];
for (let i = 1; i <= 30; i++) {
  let j = 1;
  if(!(i%5)) j++
  invoices.push({
    
    invoiceDetails: {
      displayId: `INV-${i.toString().padStart(20, "0")}`,
      invoiceDate: new Date(),
      _id:`INV-${i.toString().padStart(10, "0")}`
    },
    supplierDetails: {
      name: "ABC ",
      lastName:"Enterprises",
      gstin: "27ABCDE1234F2Z5",
      address: "123 Business Park, Mumbai, Maharashtra"
    },
    recipientDetails: {
      firstName: "XYZ Pvt. Ltd.",
      displayId:`PT-${j.toString().padStart(20, "0")}`,
      lastName:"Enterprises",
      gstin: "27XYZDE5678G1Z6",
      address: "456 Corporate Avenue, Pune, Maharashtra"
    },
    placeOfSupply: "Maharashtra",
    reverseCharge: false,
    itemDetails: [
      {
        itemName: `Product ${String.fromCharCode(64 + i)}`,
        _id: `Product ${String.fromCharCode(64 + i)}`,
        hsnSacCode: (1000 + i).toString(),
        quantity: i,
        discount:0,
        unitPrice: 500 + i * 10,
        taxableValue: i * (500 + i * 10),
        cgst: i * (500 + i * 10) * 0.09,
        sgst: i * (500 + i * 10) * 0.09,
        igst: 0,
        total: i * (500 + i * 10) * 1.18
      }
    ],
    taxDetails: {
      totalTaxableValue: i * (500 + i * 10),
      totalCGST: i * (500 + i * 10) * 0.09,
      totalSGST: i * (500 + i * 10) * 0.09,
      totalIGST: 0,
      totalCess: 0
    },
    totalAmount: {
      totalValue: i * (500 + i * 10) * 1.18,
      inWords: `${i * (500 + i * 10) * 1.18} Only`
    },
    netAmount: {
      totalValue: i * (500 + i * 10) * 1.18,
      inWords: `${i * (500 + i * 10) * 1.18} Only`
    },
    discount:0,
    signature: "Authorized Signatory",
    createdBy:"Test User "
  });
}


module.exports = invoices
 
