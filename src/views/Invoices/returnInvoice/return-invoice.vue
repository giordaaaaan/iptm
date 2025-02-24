<template>
    <div class="container">
      <h1>Return Invoice</h1>
      <p>
        You are about to return the invoice <strong>{{ filename }}.pdf</strong> to the requestor.
      </p>
  
      <div class="form-row">
        <label>From:</label>
        <input type="text" v-model="from" />
      </div>
  
      <div class="form-row">
        <label>To:</label>
        <input type="text" v-model="to" />
      </div>
  
      <div class="form-row">
        <label>Subject:</label>
        <input type="text" v-model="subject" />
      </div>
  
      <div class="form-row">
        <label>Email Body:</label>
        <textarea v-model="emailBody" rows="6"></textarea>
      </div>
  
      <div class="button-row">
        <button class="btn-return" @click="returnInvoice">
          Return Invoice and Send email to requestor
        </button>
        <button class="btn-back" @click="goBack">Go Back</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Example: you can pass the filename as a prop or retrieve it from store/route.
  const filename = ref(
    "510636663 MACHINE AND COMPUTER HC CONSUMER S# 28773 - DR# 24058 PO# 100004444 GR# 500019077"
  )
  
  // Form fields
  const from = ref("ph-invoice-test@embedit.cz")
  const to = ref("Ondrej.Horak1@embedit.com")
  const subject = ref("RE: Returning Invoice")
  const emailBody = ref(
    `Hello,
  
  We are returning the invoice. Reason:
  - PO Number has to be a 10digit number.
  - HC TIN has to be a number with dashes containing '8453991'.
  - Due Date has to be in the form MM/DD/YYYY or NUMBER days.
  
  Please review the invoice and resubmit it.`
  )
  
  // Router for navigation
  const router = useRouter()
  
  // Methods
  function returnInvoice() {
    // Here you can implement your logic to send the email or update your backend
    console.log("Returning invoice with data:", {
      filename: filename.value,
      from: from.value,
      to: to.value,
      subject: subject.value,
      emailBody: emailBody.value
    })
    // Possibly navigate away or show a success message
  }
  
  function goBack() {
    // Navigate back to the previous page
    router.back()
  }
  </script>
  
  <style scoped>
  .container {
    margin: 20px 20px 20px 170px;
    width: calc(100% - 170px);
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    min-height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  h1 {
    margin-bottom: 15px;
  }
  
  p {
    margin-bottom: 20px;
    font-size: 14px;
  }
  
  .form-row {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .form-row label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  textarea {
    width: 100%;
    max-width: 700px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  textarea {
    resize: vertical; /* allow manual resize if needed */
  }
  
  .button-row {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn-return,
  .btn-back {
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    color: white;
  }
  
  .btn-return {
    background-color: #d32f2f;
  }
  
  .btn-return:hover {
    background-color: #c62828;
  }
  
  .btn-back {
    background-color: #777;
  }
  
  .btn-back:hover {
    background-color: #555;
  }
  </style>
  