<template>
    <div>
        <label for="monthlyEarnings" class="px-2">{{ globalsStore.language === 'en' ?
            'Monthly Earnings:' : 'Venituri Lunare:' }}</label>
        <input type="number" id="monthlyEarnings" v-model="globalsStore.monthlyEarnings.amount"
            class="border rounded p-2" />
        <label for="earningsRecurringDay" class="px-2">{{ globalsStore.language === 'en' ?
            'Recurring Day:' : ' Ziua Recurentă:' }}</label>
        <input type="number" id="earningsRecurringDay" v-model.number="selectedPayDay" :min="1" :max="maxDay"
            class="border rounded p-2" />
        <p class="mt-1 text-sm text-gray-600 px-2">
            {{ globalsStore.language === 'en' ? 'Selected date:' : 'Data selectată:' }} {{ formattedRecurringDate }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'

const globalsStore = useGlobalsStore()

const selectedPayDay = ref<number>(globalsStore.monthlyEarnings.recurringDay || 1)

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

// maximum days in the current month; used to constrain the input
const maxDay = computed(() => new Date(currentYear, currentMonth + 1, 0).getDate())

watch(selectedPayDay, (newDay) => {
    if (typeof newDay === 'number' && newDay >= 1) {
        globalsStore.setRecurringDay(newDay)
    }
})

const formattedRecurringDate = computed(() => {
    const iso = globalsStore.monthlyEarnings.recurringDate
    if (!iso) return ''
    const d = new Date(iso)
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString()
})
</script>