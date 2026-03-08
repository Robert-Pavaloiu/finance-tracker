<template>
    <form class="bg-gray-100 border p-6 shadow-lg rounded-lg max-w-xl mx-auto">
        <div class="p-2">
            <label for="amount" class="pr-2">{{ globalsStore.language === 'en' ? 'Amount:' : 'Sumă:' }}</label>
            <input type="number" id="amount" v-model="transaction.amount" class="border rounded p-2" />
        </div>
        <div class="p-2">
            <label for="category" class="pr-2">{{ globalsStore.language === 'en' ? 'Category:' : 'Categorie:' }}</label>
            <select id="category" v-model="transaction.category" class="border rounded p-2">
                <option v-for="category in Object.values(NonRecurringTransactionCategory)" :key="category"
                    :value="category">
                    {{ translateCategory(category) }}
                </option>
            </select>
        </div>
        <div>
            <div>
                <label for="date" class="pr-2">{{ globalsStore.language === 'en' ? 'Date:' : 'Data:' }}</label>
                <input type="date" id="date" v-model="transaction.date" class="border rounded p-2" />
            </div>
        </div>
        <button type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white p-2 m-2 rounded-lg shadow-lg border-2 border-blue-800"
            v-on:click.prevent="addTransaction">{{ globalsStore.language === 'en' ?
                'Add Transaction' : 'Adaugă Tranzacție' }}</button>
    </form>
</template>

<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';
import { NonRecurringTransactionCategory } from '@/enums';
import { useCategory } from '@/composables/useCategory'
const { translateCategory } = useCategory()

const globalsStore = useGlobalsStore();


const transaction = ref<{ amount: number; category: NonRecurringTransactionCategory; date?: string }>({ amount: 0, category: NonRecurringTransactionCategory.Other, date: new Date().toISOString().split('T')[0] });

const addTransaction = () => {
    if (transaction.value.amount > 0 && transaction.value.category && transaction.value.date) {
        globalsStore.transactionHistory.push({
            ...transaction.value,
            id: globalsStore.transactionHistory.length + 1
        });
    }
    transaction.value = { amount: 0, category: NonRecurringTransactionCategory.Other, date: new Date().toISOString().split('T')[0] };
};
</script>