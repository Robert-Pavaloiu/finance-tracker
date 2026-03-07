<template>
    <h1 class="p-2 text-2xl font-bold">{{ globalsStore.language === 'en' ? 'Budgets' : 'Bugete' }}</h1>
    <div>
        <h1 class="p-2 text-xl font-bold">{{ globalsStore.language === 'en' ? 'Money In' : 'Bani Intrați' }}</h1>
        <MonthlyEarningsForm />
    </div>
    <div class="mt-4">
        <h1 class="p-2 text-xl font-bold">{{ globalsStore.language === 'en' ? 'Money Out' : 'Bani Ieșiti' }}</h1>
        <RentExpenseForm />
    </div>
    <div class="mt-4">
        <h2 class="p-2 text-md font-bold">{{ globalsStore.language === 'en' ? 'Add New Recurring Expense'
            : 'Adaugă Cheltuială Recurentă Nouă' }}</h2>
        <RecurringTransactionForm />
    </div>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store'
import RecurringTransactionForm from '@/components/recurring-transaction-form.vue'
import RentExpenseForm from '@/components/rent-expense-form.vue'
import MonthlyEarningsForm from '@/components/monthly-earnings-form.vue'

const globalsStore = useGlobalsStore()
</script>