import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import DataReport from '../views/datareport.vue'
import AuditLogs from '../views/auditlogs.vue'
import InvoiceAdmin from '../views/Invoices/invoiceAdmin.vue'
import InvoicesClerk from '../views/Invoices/invoicesClerk.vue'
import InvoicesProcessor from '../views/Invoices/invoicesProcessor.vue'
import InvoiceShowAdmin from '../views/Invoices/invoiceDetails/invoiceShowAdmin.vue'
import InvoiceShowProcessor from '../views/Invoices/invoiceDetails/invoiceShowProcessor.vue'

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
  { path: '/', redirect: '/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router