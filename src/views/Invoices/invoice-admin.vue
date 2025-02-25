<template>
  <div class="container">
    <div class="filters">
      <!-- Created Date Pair -->
      <div class="date-box">
        <label for="created-from">Created from:</label>
        <input type="date" id="created-from" v-model="createdFrom" />
        <label for="created-to">To:</label>
        <input type="date"
               id="created-to"
               v-model="createdTo"
               :min="createdFrom"
               :max="maxCreatedTo"
               :disabled="!createdFrom" />
      </div>
      <!-- Processed Date Pair -->
      <div class="date-box">
        <label for="processed-from">Processed from:</label>
        <input type="date" id="processed-from" v-model="processedFrom" />
        <label for="processed-to">To:</label>
        <input type="date"
               id="processed-to"
               v-model="processedTo"
               :min="processedFrom"
               :max="maxProcessedTo"
               :disabled="!processedFrom" />
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
        <tr v-for="invoice in paginatedInvoices" :key="invoice.iid">
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
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Date filters for "Created" pair
const createdFrom = ref('');
const createdTo = ref('');

// Date filters for "Processed" pair
const processedFrom = ref('');
const processedTo = ref('');

// Other filters
const filters = ref({ iid: '', filename: '', processor: '', status: '' });

// Pagination
const itemsPerPage = ref(10);
const currentPage = ref(1);

// Sample invoices data (replace with your API call)
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
    createDate: "2025-05-31 08:49:40",
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
  // ...more invoices
]);

// Filter invoices based on search inputs and date ranges
const filteredInvoices = computed(() => {
  return invoices.value.filter(invoice => {
    // Check textual filters
    const textValid =
      invoice.iid.toLowerCase().includes(filters.value.iid.toLowerCase()) &&
      invoice.filename.toLowerCase().includes(filters.value.filename.toLowerCase()) &&
      invoice.processor.toLowerCase().includes(filters.value.processor.toLowerCase()) &&
      (filters.value.status === "" || invoice.status === filters.value.status);

    // Check Created date range
    let createdValid = true;
    if (createdFrom.value) {
      const invCreated = invoice.createDate.substring(0, 10); // YYYY-MM-DD portion
      createdValid = createdValid && (invCreated >= createdFrom.value);
    }
    if (createdTo.value) {
      const invCreated = invoice.createDate.substring(0, 10);
      createdValid = createdValid && (invCreated <= createdTo.value);
    }

    // Check Processed date range (if processDate is not "NA")
    let processedValid = true;
    if (processedFrom.value && invoice.processDate !== 'NA') {
      const invProcessed = invoice.processDate.substring(0, 10);
      processedValid = processedValid && (invProcessed >= processedFrom.value);
    }
    if (processedTo.value && invoice.processDate !== 'NA') {
      const invProcessed = invoice.processDate.substring(0, 10);
      processedValid = processedValid && (invProcessed <= processedTo.value);
    }

    return textValid && createdValid && processedValid;
  });
});

// Pagination computed values
const totalPages = computed(() => Math.ceil(filteredInvoices.value.length / itemsPerPage.value));
const paginatedInvoices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredInvoices.value.slice(start, start + itemsPerPage.value);
});
const goToPage = (page) => { currentPage.value = page; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

// Navigation actions
const showInvoice = (invoice) => { router.push(`/invoice/${invoice.iid}/show/admin`); };
const assignInvoice = (invoice) => { console.log("Assign invoice", invoice); };
const exportReport = () => { console.log("Exporting report", filteredInvoices.value); };

// Computed maximum allowable "to" dates (1-month limit)
const maxCreatedTo = computed(() => {
  if (!createdFrom.value) return '';
  const fromDate = new Date(createdFrom.value);
  fromDate.setMonth(fromDate.getMonth() + 1);
  return fromDate.toISOString().split('T')[0];
});

const maxProcessedTo = computed(() => {
  if (!processedFrom.value) return '';
  const fromDate = new Date(processedFrom.value);
  fromDate.setMonth(fromDate.getMonth() + 1);
  return fromDate.toISOString().split('T')[0];
});
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
  flex-wrap: wrap;
  justify-content: flex-start;
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
  table-layout: auto;
}

.invoice-table th,
.invoice-table td {
  padding: 12px;
  text-align: left;
  color: #333;
  border: 1px solid #ddd;
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

.pagination .active {
  background-color: #007bff;
  color: white;
}
</style>
