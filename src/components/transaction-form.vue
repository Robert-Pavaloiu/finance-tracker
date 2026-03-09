<template>
    <form
        class="bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 border p-6 shadow-lg rounded-lg max-w-xl mx-auto">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label for="amount">{{ globalsStore.language === 'en' ? 'Amount:' : 'Sumă:' }}</label>
            <input type="number" id="amount" v-model="transaction.amount"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />

            <label for="category">{{ globalsStore.language === 'en' ? 'Category:' : 'Categorie:' }}</label>
            <select id="category" v-model="transaction.category"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white">
                <option v-for="category in Object.values(NonRecurringCategories)" :key="category" :value="category">
                    {{ translateCategory(category) }}
                </option>
            </select>

            <label for="date">{{ globalsStore.language === 'en' ? 'Date:' : 'Data:' }}</label>
            <input type="date" id="date" v-model="transaction.date"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />
        </div>
        <div class="flex justify-center mt-4">
            <button type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white p-2 px-6 rounded-lg shadow-lg border-2 border-blue-800"
                v-on:click.prevent="addTransaction">
                {{ globalsStore.language === 'en' ? 'Add Transaction' : 'Adaugă Tranzacție' }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';
import { NonRecurringCategories } from '@/enums';
import { useCategory } from '@/composables/useCategory'
const { translateCategory } = useCategory()

const globalsStore = useGlobalsStore();


const transaction = ref<{ amount: number; category: typeof NonRecurringCategories[number]; date?: string }>({ amount: 0, category: NonRecurringCategories[0], date: new Date().toISOString().split('T')[0] });

const addTransaction = () => {
    if (transaction.value.amount > 0 && transaction.value.category && transaction.value.date) {
        globalsStore.transactionHistory.push({
            ...transaction.value,
            id: crypto.randomUUID()
        });
    }
    transaction.value = { amount: 0, category: NonRecurringCategories[0], date: new Date().toISOString().split('T')[0] };
};
</script>