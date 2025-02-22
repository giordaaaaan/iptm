<template>
    <div class="sidebar">
        <ul class="menu">
            <li><span class="main-item">INVOICE PROCESSING TOOL</span></li>
            <!-- Adjust the route paths as needed based on your user role logic -->
            <li><router-link to="/invoices/admin">INVOICES</router-link></li>
            <li><router-link to="/dashboard">DASHBOARD</router-link></li>
            <li><router-link to="/data-report">DATA REPORT</router-link></li>
            <!-- Audit Logs only available for admin -->
            <li v-if="userIsAdmin">
                <router-link to="/audit-logs">AUDIT LOG</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            // For demonstration, we assume the current user is admin.
            // In a real app, replace this with a computed value from a store or API.
            userIsAdmin: true
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 250px;
    background-color: #f1f1f1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1000; /* Ensure sidebar stays above other content */
}

.brand img {
    width: 100px;
    height: auto;
    margin-bottom: 30px;
}

.menu {
    list-style: none;
    width: 100%;
    padding-left: 0;
}

.menu li {
    margin: 10px 0;
}

.menu li a {
    text-decoration: none;
    font-size: 12px;
    color: #333;
    display: flex;
    align-items: center;
    padding: 7px 12px;
    border-radius: 7px;
    transition: background-color 0.3s;
}

.menu li a:hover {
    background-color: #ddd;
}

.menu .main-item {
    font-weight: bold;
    font-size: 12px;
    color: white;
    background-color: #d32f2f;
    padding: 10px 12px;
    border-radius: 4px;
    text-align: center;
    cursor: default;
    white-space: nowrap;
    margin-bottom: 7px;
}
</style>
