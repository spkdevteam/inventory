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
    itemKart:[
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
    discount:0,
    signature: "Authorized Signatory",
    createdBy:"Test User "
  });
}

// const invoices = [
//   {
//     invoiceDetails: {
//       displayId: "INV-00000000000000000001",
//       invoiceDate: new Date(),
//       _id: "INV-0000000001",
//     },
//     supplierDetails: {
//       name: "ABC",
//       lastName: "Enterprises",
//       gstin: "27ABCDE1234F2Z5",
//       address: "123 Business Park, Mumbai, Maharashtra",
//     },
//     recipientDetails: {
//       firstName: "XYZ Pvt. Ltd.",
//       displayId: "PT-00000000000000000001",
//       lastName: "Enterprises",
//       gstin: "27XYZDE5678G1Z6",
//       address: "456 Corporate Avenue, Pune, Maharashtra",
//     },
//     placeOfSupply: "Maharashtra",
//     reverseCharge: false,
//     itemDetails: [
//       {
//         itemName: "Product A",
//         _id: "ProductA",
//         hsnSacCode: "1001",
//         quantity: 5,
//         discount: 50,
//         unitPrice: 500,
//         taxableValue: 2400,
//         cgst: 216,
//         sgst: 216,
//         igst: 0,
//         total: 2832,
//       },
//       {
//         itemName: "Product B",
//         _id: "ProductB",
//         hsnSacCode: "1002",
//         quantity: 3,
//         discount: 30,
//         unitPrice: 800,
//         taxableValue: 2370,
//         cgst: 213.3,
//         sgst: 213.3,
//         igst: 0,
//         total: 2796.6,
//       },
//     ],
//     taxDetails: {
//       totalTaxableValue: 4770,
//       totalCGST: 429.3,
//       totalSGST: 429.3,
//       totalIGST: 0,
//       totalCess: 0,
//     },
//     totalAmount: {
//       totalValue: 5998.6,
//       inWords: "5998.6 Only",
//     },
//     netAmount: {
//       totalValue: 5998.6,
//       inWords: "5998.6 Only",
//     },
//     itemKart: [
//       {
//         itemName: "Product A",
//         _id: "ProductA",
//         hsnSacCode: "1001",
//         quantity: 5,
//         discount: 50,
//         unitPrice: 500,
//         taxableValue: 2400,
//         cgst: 216,
//         sgst: 216,
//         igst: 0,
//         total: 2832,
//       },
//       {
//         itemName: "Product B",
//         _id: "ProductB",
//         hsnSacCode: "1002",
//         quantity: 3,
//         discount: 30,
//         unitPrice: 800,
//         taxableValue: 2370,
//         cgst: 213.3,
//         sgst: 213.3,
//         igst: 0,
//         total: 2796.6,
//       },
//     ],
//     discount: 80,
//     signature: "Authorized Signatory",
//     createdBy: "Test User",
//   },
//   {
//     invoiceDetails: {
//       displayId: "INV-00000000000000000002",
//       invoiceDate: new Date(),
//       _id: "INV-0000000002",
//     },
//     supplierDetails: {
//       name: "LMN",
//       lastName: "Traders",
//       gstin: "27LMNTRD4567F9Z8",
//       address: "789 Industrial Zone, Nagpur, Maharashtra",
//     },
//     recipientDetails: {
//       firstName: "DEF Corp.",
//       displayId: "PT-00000000000000000002",
//       lastName: "Corporates",
//       gstin: "27DEFCRP6789H2Z7",
//       address: "321 Tech Valley, Nashik, Maharashtra",
//     },
//     placeOfSupply: "Maharashtra",
//     reverseCharge: false,
//     itemDetails: [
//       {
//         itemName: "Product C",
//         _id: "ProductC",
//         hsnSacCode: "2001",
//         quantity: 10,
//         discount: 100,
//         unitPrice: 400,
//         taxableValue: 3900,
//         cgst: 351,
//         sgst: 351,
//         igst: 0,
//         total: 4602,
//       },
//       {
//         itemName: "Product D",
//         _id: "ProductD",
//         hsnSacCode: "2002",
//         quantity: 8,
//         discount: 80,
//         unitPrice: 700,
//         taxableValue: 5440,
//         cgst: 489.6,
//         sgst: 489.6,
//         igst: 0,
//         total: 6419.2,
//       },
//     ],
//     taxDetails: {
//       totalTaxableValue: 9340,
//       totalCGST: 840.6,
//       totalSGST: 840.6,
//       totalIGST: 0,
//       totalCess: 0,
//     },
//     totalAmount: {
//       totalValue: 11021.2,
//       inWords: "11021.2 Only",
//     },
//     netAmount: {
//       totalValue: 11021.2,
//       inWords: "11021.2 Only",
//     },
//     discount: 180,
//     signature: "Authorized Signatory",
//     createdBy: "Test User",
//   },
//   // Add three more similar entries for a total of five invoices...
// ];



module.exports = invoices
 
