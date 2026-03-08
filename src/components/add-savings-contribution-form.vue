<template>
    <h1 class="p-2 text-xl font-bold text-center dark:text-white">{{ globalsStore.language === 'en' ? 'Add Contribution'
        : 'Adaugă Contribuție' }}
    </h1>
    <form
        class="bg-gray-100 border p-6 shadow-lg rounded-lg max-w-xl mx-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <div class="mb-4">
            <label for="contribution" class="pr-2">{{ globalsStore.language === 'en' ? 'Contribution Amount:' :
                'Suma Contribuției:' }}</label>
            <input type="number" id="contribution" v-model="contribution.amount" class="border rounded p-2" />
        </div>
        <div class="mb-4">
            <label for="contributionDate" class="pr-2">{{ globalsStore.language === 'en' ? 'Contribution Date:' :
                'Data Contribuției:' }}</label>
            <input type="date" id="contributionDate" v-model="contribution.date" class="border rounded p-2" />
        </div>
        <button type="submit"
            class="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg shadow-lg border-2 border-green-800"
            v-on:click.prevent="addContribution">{{ globalsStore.language === 'en' ?
                'Add Contribution' : 'Adaugă Contribuție' }}</button>
    </form>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { useSavingsStore } from '@/stores/savings-store';
import { ref } from 'vue';
const globalsStore = useGlobalsStore();
const savingsStore = useSavingsStore();

const contribution = ref<{
    amount: number;
    date?: string;
}>({
    amount: 0,
    date: new Date().toISOString().split('T')[0]
});

const addContribution = () => {
    if (contribution.value.amount > 0 && contribution.value.date) {
        savingsStore.contributions.push({
            amount: contribution.value.amount,
            date: contribution.value.date
        });
        // Reset form
        contribution.value = {
            amount: 0,
            date: new Date().toISOString().split('T')[0]
        };
    }
};
</script>
