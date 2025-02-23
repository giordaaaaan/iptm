<template>
    <div class="container">
        <div class="filters">
            <div class="date-box">
                <label for="created-from">Created from:</label>
                <input type="date" id="created-from" v-model="createdFrom" />
                <label for="created-to">To:</label>
                <input type="date" id="created-to" v-model="createdTo" />
            </div>
            <button class="export-btn" @click="exportReport">EXPORT REPORT</button>
        </div>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>
                        Processor
                        <input type="text" class="text-filter" placeholder="Search Processor"
                            v-model="filters.processor" />
                    </th>
                    <th>Action Date</th>
                    <th>Action</th>
                    <th>
                        IID
                        <input type="text" class="text-filter" placeholder="Search IID" v-model="filters.iid" />
                    </th>
                    <th>
                        Filename
                        <input type="text" class="text-filter" placeholder="Search Filename"
                            v-model="filters.filename" />
                    </th>
                    <th>Remarks</th>
                    <th>Old Status</th>
                    <th>New Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(invoice, index) in filteredInvoices" :key="index">
                    <td>{{ invoice.processor }}</td>
                    <td>{{ invoice.actionDate }}</td>
                    <td>{{ invoice.action }}</td>
                    <td>{{ invoice.iid }}</td>
                    <td>{{ invoice.filename }}</td>
                    <td>{{ invoice.remarks }}</td>
                    <td>{{ invoice.oldStatus }}</td>
                    <td>{{ invoice.newStatus }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const createdFrom = ref("");
const createdTo = ref("");
const filters = ref({ processor: "", iid: "", filename: "" });

const invoices = ref([
    { processor: "System", actionDate: "2025-01-31 08:49:40", action: "Created", iid: "AP000031", filename: "CocaBola_Invoice001.pdf", remarks: "NA", oldStatus: "New", newStatus: "New" },
    { processor: "ADMIN_JOHN B", actionDate: "2025-01-31 09:05:20", action: "Assigned to processor", iid: "AP000831", filename: "Levono_Invoice90201.pdf", remarks: "Assign to Reina", oldStatus: "New", newStatus: "Assigned" },
    { processor: "Reina Tatlonghari", actionDate: "2025-01-31 09:49:40", action: "Status Change", iid: "AP000831", filename: "Levono_Invoice90201.pdf", remarks: "For payment", oldStatus: "Assigned", newStatus: "Processed" },
    { processor: "CLERK_MARIA", actionDate: "2025-01-31 09:50:20", action: "Assigned to processor", iid: "AP000865", filename: "Chamito_Invoice001.pdf", remarks: "Assign to Juan", oldStatus: "Assigned", newStatus: "Assigned" },
    { processor: "Juan dela Cruz", actionDate: "2025-01-31 10:10:40", action: "Status Change", iid: "AP000865", filename: "Chamito_Invoice001.pdf", remarks: "Incorrect Amount", oldStatus: "Returned", newStatus: "Returned" }
]);

const filteredInvoices = computed(() => {
    return invoices.value.filter(invoice =>
        invoice.processor.toLowerCase().includes(filters.value.processor.toLowerCase()) &&
        invoice.iid.toLowerCase().includes(filters.value.iid.toLowerCase()) &&
        invoice.filename.toLowerCase().includes(filters.value.filename.toLowerCase())
    );
});

const exportReport = () => {
    console.log("Export report", filteredInvoices.value);
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

.text-filter {
    width: 120px;
    padding: 6px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
}
</style>
