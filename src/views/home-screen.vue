<template>
    <SummaryBar />
    <br />
    <TransactionForm />
    <TransactionsTable />
    <br />
    <ExpensePieChart />
</template>
<script setup lang="ts">
import ExpensePieChart from '@/components/expense-pie-chart.vue';
import SummaryBar from '@/components/summary-bar.vue';
import TransactionForm from '@/components/transaction-form.vue';
import TransactionsTable from '@/components/transactions-table.vue';
</script>