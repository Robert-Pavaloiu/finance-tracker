<template>
    <div class="mt-4">
        <label for="rentAmount" class="px-2">{{ globalsStore.language === 'en' ? 'Rent:' : 'Chirie:' }}</label>
        <input type="number" id="rentAmount" v-model.number="rentAmount" class="border rounded p-2" />
        <label for="rentRecurringDay" class="px-2">{{ globalsStore.language === 'en' ?
            'Recurring Day:' : ' Ziua Recurentă:' }}</label>
        <input type="number" id="rentRecurringDay" v-model.number="rentRecurringDay" :min="1" :max="maxDay"
            class="border rounded p-2" />
        <p class="mt-1 text-sm text-gray-600 px-2">
            {{ globalsStore.language === 'en' ? 'Selected date:' : 'Data selectată:' }} {{ formattedRentDate }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'

const globalsStore = useGlobalsStore()

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

// maximum days in the current month; used to constrain the input
const maxDay = computed(() => new Date(currentYear, currentMonth + 1, 0).getDate())

const rentExpense = computed(() => globalsStore.recurringExpenses.find(e => e.category === 'Rent'))
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
        globalsStore.setRecurringExpenseAmount('Rent', newAmount)
    }
})

watch(rentRecurringDay, (newDay) => {
    if (isUpdatingFromStore) return
    if (typeof newDay === 'number' && newDay >= 1) {
        globalsStore.setRecurringExpenseDay('Rent', newDay)
    }
})

const formattedRentDate = computed(() => {
    const rent = globalsStore.recurringExpenses.find(e => e.category === 'Rent')
    if (!rent || !rent.recurringDate) return ''
    const d = new Date(rent.recurringDate)
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString()
})
</script>