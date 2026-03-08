<template>
    <h1 class="text-3xl font-bold text-center mt-6 dark:text-white">{{
        globalsStore.language === 'en' ?
            'Budget' :
            'Buget' }}</h1>
    <h2 class="p-2 text-xl font-bold text-center dark:text-white">{{ globalsStore.language === 'en' ? 'Money In'
        : 'Bani Intrați' }}
    </h2>
    <div
        class="bg-gray-100 border p-6 shadow-lg rounded-lg max-w-2xl mx-auto dark:text-white dark:bg-gray-800 dark:border-gray-700">
        <MonthlyEarningsForm />
    </div>
    <h2 class="p-2 text-xl font-bold text-center dark:text-white">{{
        globalsStore.language === 'en' ? 'Money Out' :
            'Bani Ieșiti' }}
    </h2>
    <div
        class="mt-4 bg-gray-100 border p-6 shadow-lg rounded-lg max-w-2xl mx-auto dark:text-white dark:bg-gray-800 dark:border-gray-700">
        <h2 class="p-2 text-md font-bold">{{ globalsStore.language === 'en' ? 'Add New Fixed Recurring Expense'
            : 'Adaugă Cheltuială Recurentă Nouă' }}</h2>
        <RentExpenseForm />
    </div>
    <div
        class="mt-4 bg-gray-100 border p-6 shadow-lg rounded-lg max-w-2xl mx-auto dark:text-white dark:bg-gray-800 dark:border-gray-700">
        <h2 class="p-2 text-md font-bold">{{ globalsStore.language === 'en'
            ? 'Add New Variable Recurring Expense'
            : 'Adaugă Cheltuială Variabilă Recurentă Nouă' }}</h2>
        <RecurringTransactionForm />
    </div>
    <RecurringExpensesTable />
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store'
import RecurringTransactionForm from '@/components/recurring-transaction-form.vue'
import RentExpenseForm from '@/components/rent-expense-form.vue'
import MonthlyEarningsForm from '@/components/monthly-earnings-form.vue'
import RecurringExpensesTable from '@/components/recurring-expenses-table.vue'

const globalsStore = useGlobalsStore()
</script>