import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import DataReport from '../views/data-report.vue'
import AuditLogs from '../views/audit-logs.vue'
import InvoiceAdmin from '../views/Invoices/invoice-admin.vue'
import InvoicesClerk from '../views/Invoices/invoices-clerk.vue'
import InvoicesProcessor from '../views/Invoices/invoices-processor.vue'
import InvoiceShowAdmin from '../views/Invoices/invoiceDetails/invoice-show-admin.vue'
import InvoiceShowProcessor from '../views/Invoices/invoiceDetails/invoice-show-processor.vue'
import ReturnInvoice from '../views/Invoices/returnInvoice/return-invoice.vue'

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/data-report', component: DataReport },
  { path: '/audit-logs', component: AuditLogs },
  // Invoices route: 
  { path: '/invoices/admin', component: InvoiceAdmin },
  { path: '/invoices/clerk', component: InvoicesClerk },
  { path: '/invoices/processor', component: InvoicesProcessor },
  { path: '/invoice/:id/show/admin', component: InvoiceShowAdmin },
  { path: '/invoice/:id/show/processor', component: InvoiceShowProcessor },
  { path: '/invoice/return-invoice', component: ReturnInvoice },
  { path: '/', redirect: '/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router