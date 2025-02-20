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

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            createdFrom: "",
            createdTo: "",
            filters: {
                processor: "",
                iid: "",
                filename: ""
            },
            // Sample data – replace with your actual data or API call
            invoices: [
                {
                    processor: "System",
                    actionDate: "2025-01-31 08:49:40",
                    action: "Created",
                    iid: "AP000031",
                    filename: "CocaBola_Invoice001.pdf",
                    remarks: "NA",
                    oldStatus: "New",
                    newStatus: "New"
                }
                // ... more rows
            ]
        };
    },
    computed: {
        filteredInvoices() {
            return this.invoices.filter(invoice => {
                return (
                    invoice.processor.toLowerCase().includes(this.filters.processor.toLowerCase()) &&
                    invoice.iid.toLowerCase().includes(this.filters.iid.toLowerCase()) &&
                    invoice.filename.toLowerCase().includes(this.filters.filename.toLowerCase())
                );
            });
        }
    },
    methods: {
        exportReport() {
            console.log("Export report", this.filteredInvoices);
            // Implement CSV/Excel export functionality here.
        }
    }
};
</script>

<style scoped>
.container {
    /* Offset the container to the right to account for the sidebar */
    margin: 20px 20px 20px 320px;
    /* Top, right, bottom, left */
    width: calc(100% - 320px);
    /* Adjust width to prevent horizontal overflow */
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
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
