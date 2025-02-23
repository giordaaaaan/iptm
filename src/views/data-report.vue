<template>
  <div class="container">
    <div class="filters">
      <div class="date-box">
        <label for="processed-from">Processed From:</label>
        <input type="date" id="processed-from" v-model="processedFrom" />
        <label for="processed-to">To:</label>
        <input type="date" id="processed-to" v-model="processedTo" />
      </div>
      <button class="export-btn" @click="exportReport">EXPORT REPORT</button>
    </div>
    <!-- Removed the table-wrapper so the table remains fully visible -->
    <table class="invoice-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Processed Date</th>
          <th>Processor</th>
          <th>Id</th>
          <th>Vendor Name</th>
          <th>Customer</th>
          <th>Invoice Number</th>
          <th>PO Number</th>
          <th>GR Number</th>
          <th>BIR Number</th>
          <th>HC TIN</th>
          <th>Vendor TIN</th>
          <th>Invoice Type</th>
          <th>Invoice Date</th>
          <th>Due Date</th>
          <th>Total Amount</th>
          <th>Total Amount Words</th>
          <th>Currency</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in reports" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ report.processedDate }}</td>
          <td>{{ report.processedBy }}</td>
          <td>{{ report.id }}</td>
          <td>{{ report.vendorName }}</td>
          <td>{{ report.customer }}</td>
          <td>{{ report.invoiceNumber }}</td>
          <td>{{ report.poNumber }}</td>
          <td>{{ report.grNumber }}</td>
          <td>{{ report.birNumber }}</td>
          <td>{{ report.hcTin }}</td>
          <td>{{ report.vendorTin }}</td>
          <td>{{ report.invoiceType }}</td>
          <td>{{ report.invoiceDate }}</td>
          <td>{{ report.dueDate }}</td>
          <td>{{ report.totalAmount }}</td>
          <td>{{ report.totalAmountWords }}</td>
          <td>{{ report.currency }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const processedFrom = ref('');
const processedTo = ref('');
const reports = ref([
  {
    processedDate: "2025-01-29 20:40:05",
    processedBy: "oh_processor",
    id: "9a01a942-f984-45f7-a342-263af283164d",
    vendorName: "HC Consumer Finance",
    customer: "Infobip Philippines Inc.",
    invoiceNumber: "2500/23",
    poNumber: "",
    grNumber: "009-676-542-000",
    birNumber: "Tax",
    hcTin: "",
    vendorTin: "12/05/2023",
    invoiceType: "01/19/2024",
    invoiceDate: "",
    dueDate: "",
    totalAmount: "1,219,112.30",
    totalAmountWords: "",
    currency: "PHP"
  },
  {
    processedDate: "2025-01-31 09:15:27",
    processedBy: "oh_processor",
    id: "80729c24-4d90-4566-aef7-30243b33992f",
    vendorName: "HC Consumer Finance",
    customer: "Crown Worldwide Movers, Inc.",
    invoiceNumber: "315601-008327",
    poNumber: "",
    grNumber: "1234567890",
    birNumber: "INVOICE",
    hcTin: "",
    vendorTin: "07/31/2024",
    invoiceType: "30 days",
    invoiceDate: "",
    dueDate: "",
    totalAmount: "203,515.20",
    totalAmountWords: "",
    currency: "PHP"
  }
]);

const exportReport = () => {
  console.log("Exporting report", reports.value);
  // Implement export functionality as needed.
};
</script>

<style scoped>
.container {
  margin: 20px 20px 20px 110px;
  /* Top, Right, Bottom, Left */
  width: calc(100% - 110px);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.filters {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.date-box {
  display: flex;
  gap: 10px;
  align-items: center;
}

.export-btn {
  background-color: #d32f2f;
  color: white;
  padding: 8px 15px;
  font-size: 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.export-btn:hover {
  background-color: #c62828;
}

.invoice-table {
  width: 100%;
  min-width: 1200px;
  margin-top: 20px;
  border-collapse: collapse;
  font-size: 12px;
  table-layout: auto;
}

.invoice-table th,
.invoice-table td {
  padding: 12px;
  text-align: left;
  color: #333;
  border: 1px solid #ddd;
  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;

}

.invoice-table th {
  background-color: #f1f1f1;
  font-weight: bold;
}

.invoice-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.invoice-table tr:hover {
  background-color: #e8e8e8;
}

.text-filter {
  width: 120px;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}
</style>
