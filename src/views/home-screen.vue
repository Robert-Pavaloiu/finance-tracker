<template>
    <h1 class="p-2 text-2xl font-bold">Home</h1>
    <TransactionForm />
    <TransactionsTable />
    <ExpensePieChart />
</template>
<script setup lang="ts">
import ExpensePieChart from '@/components/expense-pie-chart.vue';
import TransactionForm from '@/components/transaction-form.vue';
import TransactionsTable from '@/components/transactions-table.vue';

</script>