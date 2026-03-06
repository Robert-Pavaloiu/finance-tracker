<template>
    <form>
        <div class="p-2">
            <label for="amount" class="pr-2">Amount:</label>
            <input type="number" id="amount" v-model="transaction.amount" class="border rounded p-2" />
        </div>
        <div class="p-2">
            <label for="category" class="pr-2">Category:</label>
            <select id="category" v-model="transaction.category" class="border rounded p-2">
                <option v-for="category in Object.values(TransactionCategory)" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
        </div>
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white p-2 m-2 rounded"
            v-on:click.prevent="addTransaction">Add
            Transaction</button>
    </form>
</template>

<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';

const globalsStore = useGlobalsStore();

enum TransactionCategory {
    Food = 'Food',
    Entertainment = 'Entertainment',
    Rent = 'Rent',
    Utilities = 'Utilities',
    Subscriptions = 'Subscriptions',
    Transportation = 'Transportation',
    Education = 'Education',
    Other = 'Other',
}

const transaction = ref<{ amount: number; category: TransactionCategory }>({ amount: 0, category: TransactionCategory.Other });

const addTransaction = () => {
    globalsStore.transactionHistory.push({
        ...transaction.value, date: new Date().toLocaleDateString(),
        id: globalsStore.transactionHistory.length + 1
    });
    transaction.value = { amount: 0, category: TransactionCategory.Other };
};
</script>