<template>
  <div class="container">
    <h1>Audit Logs</h1>
    <div class="form-container">
      <div class="form-row">
        <label for="start-date">From Date:</label>
        <input type="date" id="start-date" v-model="startDate" required>
        <p class="info-text">Audit logs from the given date (included)</p>
      </div>
      <div class="form-row">
        <label for="end-date">To Date:</label>
        <input type="date"
               id="end-date"
               v-model="endDate"
               :min="startDate"
               :max="maxEndDate"
               :disabled="!startDate"
               required>
        <p class="info-text">Audit logs to the given date (included)</p>
      </div>
      <div class="form-row">
        <button @click="submitDates">Submit</button>
      </div>
    </div>
    <hr />
    <br />
    <div class="results">
      <span>
        Showing results from <span>{{ appliedStartDateDisplay }}</span> to <span>{{ appliedEndDateDisplay }}</span>
      </span>
      <button class="export-btn" @click="exportLogs">Export to CSV</button>
    </div>
    <table class="audit-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Created</th>
          <th>User</th>
          <th>Action</th>
          <th>Resource (name/id)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in filteredAuditLogs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ log.created }}</td>
          <td>{{ log.user }}</td>
          <td>{{ log.action }}</td>
          <td>{{ log.resource }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const startDate = ref('');
const endDate = ref('');

// Variables to store the applied dates after clicking "Submit"
const appliedStartDate = ref('');
const appliedEndDate = ref('');

// Sample audit logs (replace with your API call)
const auditLogs = ref([
  {
    created: "2025-01-25 20:37:12.17133",
    user: "Ondrej.Horak1@embedit.com",
    action: "CREATED",
    resource: "DOCUMENT / 4f9f9327-18fa-4f63-92f2-b1d0a3a4582a"
  },
  {
    created: "2025-01-20 20:39:45.883924",
    user: "oh_processor",
    action: "UPDATED",
    resource: "INVOICE / 9a01a942-f984-45f7-a342-263af283164d"
  }
  // ... more rows as needed
]);

// Compute maximum allowable "To Date" (1 month after startDate)
const maxEndDate = computed(() => {
  if (!startDate.value) return '';
  const from = new Date(startDate.value);
  from.setMonth(from.getMonth() + 1);
  return from.toISOString().split('T')[0];
});

// Display values for applied dates
const appliedStartDateDisplay = computed(() => appliedStartDate.value || "N/A");
const appliedEndDateDisplay = computed(() => appliedEndDate.value || "N/A");

// Filter audit logs based on the applied date range (compare first 10 characters)
const filteredAuditLogs = computed(() => {
  return auditLogs.value.filter(log => {
    const logDate = log.created.substring(0, 10);
    let valid = true;
    if (appliedStartDate.value) {
      valid = valid && (logDate >= appliedStartDate.value);
    }
    if (appliedEndDate.value) {
      valid = valid && (logDate <= appliedEndDate.value);
    }
    return valid;
  });
});

const submitDates = () => {
  console.log("Dates submitted", startDate.value, endDate.value);
  // Update the applied dates only when the user clicks Submit
  appliedStartDate.value = startDate.value;
  appliedEndDate.value = endDate.value;
};

const exportLogs = () => {
  console.log("Export logs", filteredAuditLogs.value);
  // Implement export functionality as needed.
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

.form-container {
  margin-bottom: 5px;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  align-items: flex-start;
}

.form-row label {
  font-size: 12px;
  color: #333;
  margin-bottom: 5px;
}

.info-text {
  font-size: 12px;
  color: #555;
  margin: 0;
  line-height: 1;
}

/* Results row: flex container with text left and export button right */
.results {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 15px;
  color: #000000;
}

.export-btn {
  padding: 8px 15px;
  background-color: #d32f2f;
  color: white;
  font-size: 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.export-btn:hover {
  background-color: #c62828;
}

.audit-table {
  width: 100%;
  min-width: 1100px;
  margin-top: 20px;
  border-collapse: collapse;
  font-size: 14px;
}

.audit-table th,
.audit-table td {
  padding: 12px;
  text-align: left;
  color: #333;
  border: 1px solid #ddd;
}

.audit-table th {
  background-color: #f1f1f1;
  font-weight: bold;
}

.audit-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.audit-table tr:hover {
  background-color: #e8e8e8;
}
</style>
