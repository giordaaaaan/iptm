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
              <button class="show-btn" @click="showInvoice(invoice)">Show</button>
            </td>
            <td>{{ invoice.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "InvoicesProcessor",
    data() {
      return {
        createdFrom: "",
        createdTo: "",
        processedFrom: "",
        processedTo: "",
        filters: {
          iid: "",
          filename: "",
          processor: "",
          status: ""
        },
        invoices: [
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
        ]
      };
    },
    computed: {
      filteredInvoices() {
        return this.invoices.filter(invoice => {
          return (
            invoice.iid.toLowerCase().includes(this.filters.iid.toLowerCase()) &&
            invoice.filename.toLowerCase().includes(this.filters.filename.toLowerCase()) &&
            invoice.processor.toLowerCase().includes(this.filters.processor.toLowerCase()) &&
            (this.filters.status === "" || invoice.status === this.filters.status)
          );
        });
      }
    },
    methods: {
      showInvoice(invoice) {
        this.$router.push(`/invoice/${invoice.iid}/show/processor`);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    width: 90%;
    margin: 20px auto;
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
  }
  .filters {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    margin-bottom: 20px;
  }
  .date-box {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .invoice-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    font-size: 14px;
  }
  .invoice-table th, .invoice-table td {
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
  .status-filter {
    width: 120px;
    padding: 6px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
  }
  .show-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  }
  .show-btn:hover {
    background-color: #45a049;
  }
  </style>
  