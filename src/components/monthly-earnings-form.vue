<template>
    <div>
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label for="monthlyEarnings">{{ globalsStore.language === 'en' ? 'Monthly Earnings:' : 'Venituri Lunare:'
            }}</label>
            <input type="number" id="monthlyEarnings" v-model="selectedAmount"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />

            <label for="earningsRecurringDay">{{ globalsStore.language === 'en' ? 'Recurring Day:' : 'Ziua Recurentă:'
            }}</label>
            <input type="number" id="earningsRecurringDay" v-model.number="selectedPayDay" :min="1" :max="maxDay"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'

const globalsStore = useGlobalsStore()

const selectedPayDay = ref<number>(globalsStore.monthlyEarnings.recurringDay || 1)
const selectedAmount = ref<number>(globalsStore.monthlyEarnings.amount || 0)

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

const maxDay = computed(() => new Date(currentYear, currentMonth + 1, 0).getDate())

watch(selectedPayDay, (newDay) => {
    if (typeof newDay === 'number' && newDay >= 1) {
        globalsStore.setRecurringDay(newDay)
    }
})

watch(selectedAmount, (newAmount) => {
    if (typeof newAmount === 'number' && newAmount >= 0) {
        globalsStore.monthlyEarnings.amount = newAmount
    }
})
</script>