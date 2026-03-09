<template>
    <div class="mt-4">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label for="rentAmount">{{ globalsStore.language === 'en' ? 'Rent:' : 'Chirie:' }}</label>
            <input type="number" id="rentAmount" v-model.number="rentAmount"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />

            <label for="rentRecurringDay">{{ globalsStore.language === 'en' ? 'Recurring Day:' : 'Ziua Recurentă:'
                }}</label>
            <input type="number" id="rentRecurringDay" v-model.number="rentRecurringDay" :min="1" :max="maxDay"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'
import { TransactionCategory } from '@/enums'

const globalsStore = useGlobalsStore()

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

// maximum days in the current month; used to constrain the input
const maxDay = computed(() => new Date(currentYear, currentMonth + 1, 0).getDate())

const rentExpense = computed(() => globalsStore.recurringExpenses.find(e => e.category === TransactionCategory.Rent))
const rentAmount = ref(rentExpense.value?.amount || 0)
const rentRecurringDay = ref(rentExpense.value?.recurringDay || 1)
let isUpdatingFromStore = false

watch(rentExpense, (newExpense) => {
    if (newExpense) {
        isUpdatingFromStore = true
        rentAmount.value = newExpense.amount
        rentRecurringDay.value = newExpense.recurringDay
        isUpdatingFromStore = false
    }
}, { immediate: true, deep: true })

watch(rentAmount, (newAmount) => {
    if (isUpdatingFromStore) return
    if (typeof newAmount === 'number' && newAmount >= 0) {
        globalsStore.setRecurringExpenseAmount(TransactionCategory.Rent, newAmount)
    }
})

watch(rentRecurringDay, (newDay) => {
    if (isUpdatingFromStore) return
    if (typeof newDay === 'number' && newDay >= 1) {
        globalsStore.setRecurringExpenseDay(TransactionCategory.Rent, newDay)
    }
})
</script>