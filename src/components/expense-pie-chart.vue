<template>
    <div v-if="globalsStore.transactionHistory.length > 0" class="w-full max-w-md mx-auto text-center dark:text-white">
        <h1 class="p-2 text-2xl font-bold">{{ globalsStore.language === 'en' ?
            'Expense Distribution' : 'Distribuția Cheltuielilor' }}</h1>
        <div class="w-full h-80">
            <Pie :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useGlobalsStore } from '@/stores/globals-store';
import type { TooltipItem } from 'chart.js';
import { useCategory } from '@/composables/useCategory'

const { translateCategory } = useCategory()

ChartJS.register(ArcElement, Tooltip, Legend);

const globalsStore = useGlobalsStore();

const chartData = computed(() => {
    const transactions = globalsStore.transactionHistory;
    const categorySums: { [key: string]: number } = {};

    transactions.forEach(t => {
        if (t.category && t.amount !== undefined && typeof t.amount === 'number') {
            const category = t.category ?? 'Unknown';
            if (!categorySums[category]) {
                categorySums[category] = 0;
            }
            categorySums[category] += t.amount ?? 0;
        }
    });

    const labels = Object.keys(categorySums).map(translateCategory)
    const data = Object.values(categorySums);

    labels.push(globalsStore.language === 'en' ? 'Leftover' : 'Suma Rămasă');
    data.push(globalsStore.leftoverBudget ?? 0);

    const palette = [
        '#ef4444', // red 
        '#3b82f6', // blue 
        '#a855f7', // purple 
        '#22c55e', // green 
        '#f97316', // orange 
        '#06b6d4', // cyan 
        '#eab308', // yellow 
        '#6b7280', // grey 
        '#d1d5db', // light grey — Leftover
    ]
    const colors = labels.map((_, i) => palette[i % palette.length])

    return {
        labels,
        datasets: [{
            data,
            backgroundColor: colors
        }]
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const
        },
        tooltip: {
            callbacks: {
                label: (context: TooltipItem<'pie'>) => {
                    const label = context.label || '';
                    const value = context.parsed as number;
                    const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${label}: ${percentage}%`;
                }
            }
        }
    }
};
</script>