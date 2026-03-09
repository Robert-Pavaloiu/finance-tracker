<template>
    <h1 class="p-2 text-xl font-bold text-center dark:text-white">{{ globalsStore.language === 'en' ? 'Target' :
        'Obiectiv' }}</h1>
    <div
        class="bg-gray-100 border p-6 shadow-lg rounded-lg max-w-xl mx-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label for="Target">{{ globalsStore.language === 'en' ? 'Savings Target:' : 'Obiectiv de Economii:'
            }}</label>
            <input type="number" id="Target" v-model="localTarget"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />

            <label for="TargetDate">{{ globalsStore.language === 'en' ? 'Complete by Date:' : 'Data de completare:'
            }}</label>
            <input type="date" id="TargetDate" v-model="localTargetDate"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />

            <label for="StartingAmount">{{ globalsStore.language === 'en' ? 'Starting Amount:' : 'Suma Inițială:'
            }}</label>
            <input type="number" id="StartingAmount" v-model="localStartingAmount"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'
import { useSavingsStore } from '@/stores/savings-store'

const globalsStore = useGlobalsStore()
const savingsStore = useSavingsStore()

const localTarget = ref<number>(savingsStore.target)
const localTargetDate = ref<string>(savingsStore.targetDate)
const localStartingAmount = ref<number>(savingsStore.startingAmount)

watch(localTarget, (val) => {
    if (typeof val === 'number' && val >= 0) {
        savingsStore.target = val
    }
})

watch(localTargetDate, (val) => {
    if (val) {
        savingsStore.targetDate = val
    }
})

watch(localStartingAmount, (val) => {
    if (typeof val === 'number' && val >= 0) {
        savingsStore.startingAmount = val
    }
})
</script>