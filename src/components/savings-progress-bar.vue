<template>
    <div class="max-w-2xl mx-auto mt-6 mb-2 px-4">
        <div class="flex justify-between mb-1">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {{ globalsStore.language === 'en' ? 'Progress Towards Goal' : 'Progres către Obiectiv' }}
            </span>
            <span class="text-sm font-bold"
                :class="progress >= 100 ? 'text-green-600' : 'text-gray-700 dark:text-gray-200'">
                {{ Math.round(progress) }}%
            </span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div class="h-4 rounded-full transition-all duration-500" :class="progressColour"
                :style="{ width: progress + '%' }" />
        </div>
        <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ globalsStore.currency === 'pound' ? '£' : globalsStore.currency === 'euro' ? '€' : '' }}{{
                    savingsStore.totalSaved }}{{ globalsStore.currency === 'lei' ? ' lei' : '' }}
                {{ globalsStore.language === 'en' ? 'saved' : 'economisiți' }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ globalsStore.language === 'en' ? 'Goal:' : 'Obiectiv:' }}
                {{ globalsStore.currency === 'pound' ? '£' : globalsStore.currency === 'euro' ? '€' : '' }}{{
                    savingsStore.target }}{{ globalsStore.currency === 'lei' ? ' lei' : '' }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSavingsStore } from '@/stores/savings-store'
import { useGlobalsStore } from '@/stores/globals-store'
import { computed } from 'vue'

const savingsStore = useSavingsStore()
const globalsStore = useGlobalsStore()

const progress = computed(() => {
    if (savingsStore.target === 0) return 0
    return Math.min((savingsStore.totalSaved / savingsStore.target) * 100, 100)
})

const progressColour = computed(() => {
    if (progress.value >= 100) return 'bg-green-500'
    if (progress.value >= 60) return 'bg-blue-500'
    if (progress.value >= 30) return 'bg-yellow-400'
    return 'bg-red-400'
})
</script>