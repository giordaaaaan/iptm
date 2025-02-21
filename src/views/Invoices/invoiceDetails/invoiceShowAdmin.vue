<template>
    <div>
      <h1>Invoice Details</h1>
      <div class="container">
        <div class="left-panel">
          <table class="invoice-table">
            <thead>
              <tr>
                <th></th>
                <th>OCR Value</th>
                <th>Modified Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>VendorName:</strong></td>
                <td>{{ invoice.vendorName }}</td>
                <td><input type="text" v-model="invoice.modifiedVendorName" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>CustomerName:</strong></td>
                <td>{{ invoice.customerName }}</td>
                <td><input type="text" v-model="invoice.modifiedCustomerName" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>InvoiceNumber:</strong></td>
                <td>{{ invoice.invoiceNumber }}</td>
                <td><input type="text" v-model="invoice.modifiedInvoiceNumber" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>PONumber:</strong></td>
                <td>{{ invoice.poNumber }}</td>
                <td><input type="text" v-model="invoice.modifiedPONumber" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>GR Number:</strong></td>
                <td>{{ invoice.grNumber }}</td>
                <td><input type="text" v-model="invoice.modifiedGRNumber" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>BIR Number:</strong></td>
                <td>{{ invoice.birNumber }}</td>
                <td><input type="text" v-model="invoice.modifiedBIRNumber" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>HCTIN:</strong></td>
                <td>{{ invoice.hcTin }}</td>
                <td><input type="text" v-model="invoice.modifiedHCTin" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>VendorTIN:</strong></td>
                <td>{{ invoice.vendorTin }}</td>
                <td><input type="text" v-model="invoice.modifiedVendorTin" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>InvoiceType:</strong></td>
                <td>{{ invoice.invoiceType }}</td>
                <td><input type="text" v-model="invoice.modifiedInvoiceType" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>InvoiceDate:</strong></td>
                <td>{{ invoice.invoiceDate }}</td>
                <td><input type="text" v-model="invoice.modifiedInvoiceDate" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>DueDate:</strong></td>
                <td>{{ invoice.dueDate }}</td>
                <td><input type="text" v-model="invoice.modifiedDueDate" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>TotalAmount:</strong></td>
                <td>{{ invoice.totalAmount }}</td>
                <td><input type="text" v-model="invoice.modifiedTotalAmount" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>TotalAmountWords:</strong></td>
                <td>{{ invoice.totalAmountWords }}</td>
                <td><input type="text" v-model="invoice.modifiedTotalAmountWords" class="editable-cell" /></td>
              </tr>
              <tr>
                <td><strong>Currency:</strong></td>
                <td>{{ invoice.currency }}</td>
                <td><input type="text" v-model="invoice.modifiedCurrency" class="editable-cell" /></td>
              </tr>
            </tbody>
          </table>
          <p>
            For further processing you can:
            <button class="btn-assign" @click="assignProcessor">Assign Processor</button>
          </p>
        </div>
        <div class="right-panel">
          <iframe :src="documentSrc" frameborder="0"></iframe>
        </div>
      </div>
      <div>
        <p class="box">
          Remarks:
          <input type="text" v-model="remarks" class="editable-cell1" />
          <button class="btn-assign1" @click="saveRemarks">Save</button>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "InvoiceShowAdmin",
    data() {
      return {
        invoice: {
          vendorName: "MEDIA METER INC.",
          customerName: "HC Consumer Finance Philippines, Inc.",
          invoiceNumber: "1005",
          poNumber: "140001670",
          grNumber: "1234567890",
          birNumber: "039AU202400003236",
          hcTin: "8453991-xxxx",
          vendorTin: "235-594-375-0000",
          invoiceType: "Service Invoice",
          invoiceDate: "07/22/2024",
          dueDate: "08/21/2024",
          totalAmount: "29700.00",
          totalAmountWords: "None",
          currency: "PHP",
          modifiedVendorName: "",
          modifiedCustomerName: "",
          modifiedInvoiceNumber: "",
          modifiedPONumber: "",
          modifiedGRNumber: "",
          modifiedBIRNumber: "",
          modifiedHCTin: "",
          modifiedVendorTin: "",
          modifiedInvoiceType: "",
          modifiedInvoiceDate: "",
          modifiedDueDate: "",
          modifiedTotalAmount: "",
          modifiedTotalAmountWords: "",
          modifiedCurrency: ""
        },
        remarks: "",
        documentSrc: "pdfs/Screenshot.pdf"
      };
    },
    methods: {
      assignProcessor() {
        console.log("Assign Processor triggered");
        // Implement assign processor logic (e.g., API call).
      },
      saveRemarks() {
        console.log("Remarks saved:", this.remarks);
        // Implement save remarks logic (e.g., API call).
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    width: 95%;
    padding: 20px;
  }
  .left-panel {
    width: 50%;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .right-panel {
    width: 50%;
    padding-left: 20px;
    box-sizing: border-box;
    height: 75vh;
  }
  .invoice-table {
    width: 70%;
    table-layout: fixed;
    border-collapse: collapse;
    font-size: 10px;
    margin-bottom: 20px;
  }
  .invoice-table th, .invoice-table td {
    padding: 5px;
    text-align: left;
    background-color: white;
    color: #333;
    border-bottom: 1px solid #ddd;
  }
  .invoice-table th {
    background-color: #ffffff;
    font-weight: bold;
  }
  .invoice-table tr:first-child td, .invoice-table tr:last-child td {
    border-top: none;
    border-bottom: none;
  }
  .invoice-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .invoice-table tr:hover {
    background-color: #f1f1f1;
  }
  .editable-cell {
    width: 100px;
    border: none;
    font-size: 10px;
    padding: 5px;
    background-color: white;
    outline: none;
  }
  .editable-cell1 {
    width: 1200px;
    border: none;
    font-size: 14px;
    padding: 5px;
    background-color: rgb(245, 242, 242);
    outline: none;
  }
  .btn-assign {
    padding: 10px 20px;
    font-size: 14px;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  .btn-assign:hover {
    background-color: #0056b3;
  }
  .btn-assign1 {
    padding: 10px 20px;
    font-size: 14px;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  .btn-assign1:hover {
    background-color: #0056b3;
  }
  iframe {
    width: 90%;
    height: 90%;
    border: none;
    align-items: left;
  }
  .box {
    outline-style: solid;
    outline-width: 2px;
    width: 1380px;
  }
  </style>
  