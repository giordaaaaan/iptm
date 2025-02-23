<template>
  <div class="container">
    <div class="filters">
      <div class="date-box">
        <label for="created-from">Created from:</label>
        <input type="date" id="created-from" v-model="createdFrom" />
        <label for="created-to">To:</label>
        <input type="date" id="created-to" v-model="createdTo" />
      </div>
      <div class="date-box">
        <label for="processed-from">Processed from:</label>
        <input type="date" id="processed-from" v-model="processedFrom" />
        <label for="processed-to">To:</label>
        <input type="date" id="processed-to" v-model="processedTo" />
      </div>
      <button class="export-btn" @click="exportReport">EXPORT REPORT</button>
    </div>
    <table class="invoice-table">
      <thead>
        <tr>
          <th>
            IID
            <input type="text" class="text-filter" placeholder="Search IID" v-model="filters.iid" />
          </th>
          <th>
            Filename
            <input type="text" class="text-filter" placeholder="Search Filename" v-model="filters.filename" />
          </th>
          <th>Create Date</th>
          <th>Process Date</th>
          <th>
            Processor
            <input type="text" class="text-filter" placeholder="Search Processor" v-model="filters.processor" />
          </th>
          <th>Action</th>
          <th>
            Status
            <select class="status-filter" v-model="filters.status">
              <option value="">All</option>
              <option value="New">NEW</option>
              <option value="Assigned">Assigned</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(invoice, index) in filteredInvoices" :key="invoice.iid">
          <td>{{ invoice.iid }}</td>
          <td>{{ invoice.filename }}</td>
          <td>{{ invoice.createDate }}</td>
          <td>{{ invoice.processDate }}</td>
          <td>{{ invoice.processor }}</td>
          <td>
            <button @click="showInvoice(invoice)">Show</button>
            <button v-if="invoice.status === 'New' || invoice.status === 'Assigned'" @click="assignInvoice(invoice)">
              Assign
            </button>
          </td>
          <td>{{ invoice.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const createdFrom = ref('');
const createdTo = ref('');
const processedFrom = ref('');
const processedTo = ref('');

const filters = ref({
  iid: '',
  filename: '',
  processor: '',
  status: ''
});

const invoices = ref([
  {
    iid: "AP000031",
    filename: "CocaBola_Invoice001.pdf",
    createDate: "2025-01-31 08:49:40",
    processDate: "NA",
    processor: "Unassigned",
    status: "New"
  },
  {
    iid: "AP000865",
    filename: "Chamito_Invoice001.pdf",
    createDate: "2025-01-31 08:49:40",
    processDate: "NA",
    processor: "Juan dela Cruz",
    status: "Assigned"
  },
  {
    iid: "AP000831",
    filename: "Levono_Invoice90201.pdf",
    createDate: "2025-01-31 08:49:40",
    processDate: "2025-02-03 10:36:41",
    processor: "Reina Tatlonghari",
    status: "Cancelled"
  }
]);

const filteredInvoices = computed(() => {
  return invoices.value.filter(invoice => {
    return (
      invoice.iid.toLowerCase().includes(filters.value.iid.toLowerCase()) &&
      invoice.filename.toLowerCase().includes(filters.value.filename.toLowerCase()) &&
      invoice.processor.toLowerCase().includes(filters.value.processor.toLowerCase()) &&
      (filters.value.status === "" || invoice.status === filters.value.status)
    );
  });
});

const showInvoice = (invoice) => {
  router.push(`/invoice/${invoice.iid}/show/admin`);
};

const assignInvoice = (invoice) => {
  console.log("Assign invoice", invoice);
};

const exportReport = () => {
  console.log("Exporting report", filteredInvoices.value);
};
</script>

<style scoped>
.container {
  margin: 20px 20px 20px 100px;
  width: 100%;
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
  min-width: 1100px;
  margin-top: 20px;
  border-collapse: collapse;
  font-size: 14px;
}

.invoice-table th,
.invoice-table td {
  padding: 12px;
  text-align: left;
  color: #333;
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

.text-filter,
.status-filter {
  width: 120px;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}
</style>
