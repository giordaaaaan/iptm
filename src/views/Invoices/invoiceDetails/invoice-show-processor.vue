<template>
  <div>
    <div class="container">
      <div class="left-panel">
        <h1>Invoice Details</h1>
        <h3>Extracted Fields</h3>
        <table class="invoice-table">
          <thead>
            <tr>
              <th></th>
              <th>OCR Value</th>
              <th>Modified Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in invoice" :key="key">
              <td><strong>{{ formatKey(key) }}:</strong></td>
              <td>{{ value }}</td>
              <td>
                <input type="text" v-model="modifiedInvoice[key]" class="editable-cell" />
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          For further processing you can:
          <button class="btn-assign" @click="assignProcessor">Assign Processor...</button>
        </p>
        <br />

        <p>
          If some values are wrong, you can modify them.
          <button class="btn-assign">Edit Values</button>
        </p>
        <br />

        <p>
          You can return the invoice back to the requestor.
          <button class="btn-assign2" @click="goToReturnInvoice">Return Back to Requestor...</button>
        </p>
        <br />

        <p>
          You can cancel the invoice and give a reason to the requestor.
          <button class="btn-assign2">Cancel</button>
        </p>
        <br />

        <p>
          If you are satisfied with invoice values,
          <button class="btn-assign3">Set Invoice as Processed</button>
        </p>
      </div>

      <!-- <div class="right-panel">
        <iframe :src="documentSrc" frameborder="0"></iframe>
      </div> -->
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'  // 1. Import useRouter

// Sample invoice data
const invoice = ref({
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
  currency: "PHP"
})

const modifiedInvoice = ref({ ...invoice.value })
const remarks = ref("")
const documentSrc = ref("pdfs/Screenshot.pdf")

// 2. Create a router instance
const router = useRouter()

const assignProcessor = () => {
  console.log("Assign Processor triggered")
}

// 3. Define a method to navigate
const goToReturnInvoice = () => {
  // Adjust the path or route name as needed
  router.push(`/invoice/return-invoice`)
}

const saveRemarks = () => {
  console.log("Remarks saved:", remarks.value)
}

// Helper to convert camelCase keys into a more readable format
const formatKey = (key) => {
  return key.replace(/([A-Z])/g, ' $1').trim()
}
</script>

<style scoped>
.container {
  margin: 0px 20px 20px 150px;
  display: flex;
  width: 95%;
  padding: 20px;
}

.left-panel {
  width: 55%;
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

.invoice-table th,
.invoice-table td {
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

.btn-assign,
.btn-assign1 {
  padding: 5px;
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

.btn-assign2 {
  padding: 5px;
  font-size: 14px;
  background-color: #ffd700;
  color: rgb(0, 0, 0);
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.btn-assign2:hover {
  background-color: #d4af37;
}

.btn-assign3 {
  padding: 5px;
  font-size: 14px;
  background-color: #08a045;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.btn-assign3:hover {
  background-color: #0b6e4f;
}

iframe {
  width: 90%;
  height: 90%;
  border: none;
}

body,
html {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevent vertical scrolling */
}

.box {
  outline-style: solid;
  outline-width: 2px;
  width: 1000px;
  /* Adjusted to be smaller */
  margin-left: 150px;
  display: flex;
  align-items: center;
  padding: 5px;
}
</style>
