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
import { useToday } from '@/composables/useToday'

const globalsStore = useGlobalsStore()
const { today } = useToday()

const selectedPayDay = ref<number>(globalsStore.monthlyEarnings.recurringDay || 1)
const selectedAmount = ref<number>(globalsStore.monthlyEarnings.amount || 0)

const currentDate = computed(() => new Date(`${today.value}T00:00:00`))
const maxDay = computed(() => new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate())

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