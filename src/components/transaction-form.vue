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
                    {{ category }}
                </option>
            </select>
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

const globalsStore = useGlobalsStore();


const transaction = ref<{ amount: number; category: NonRecurringTransactionCategory }>({ amount: 0, category: NonRecurringTransactionCategory.Other });

const addTransaction = () => {
    globalsStore.transactionHistory.push({
        ...transaction.value, date: new Date().toLocaleDateString(),
        id: globalsStore.transactionHistory.length + 1
    });
    transaction.value = { amount: 0, category: NonRecurringTransactionCategory.Other };
};
</script>