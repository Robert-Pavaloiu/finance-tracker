<template>
    <h1 class="p-2 text-xl font-bold">Transactions</h1>
    <table class="w-full bg-white">
        <thead class="bg-gray-200 text-center">
            <tr>
                <th class="py-2 w-1/3 border-b">Date</th>
                <th class="py-2 w-1/3 border-b">Amount</th>
                <th class="py-2 w-1/3 border-b">Category</th>
            </tr>
        </thead>
        <tbody class="text-center" v-show="isExpanded">
            <!-- More transactions will be dynamically added here -->
            <tr v-for="(transaction, index) in globalsStore.transactionHistory" :key="index">
                <td class="py-2 w-1/3 border-b">{{ transaction.date }}</td>
                <td class="py-2 w-1/3 border-b">{{ globalsStore.currency === 'pound' ? '£' : globalsStore.currency ===
                    'euro' ? '€' : '' }} {{ transaction.amount }} {{ globalsStore.currency === 'lei' ? 'lei' : '' }}
                </td>
                <td class="py-2 w-1/3 border-b">{{ transaction.category }}</td>
            </tr>
        </tbody>
    </table>
    <button class="bg-green-600 hover:bg-green-700 text-white p-2 m-2 rounded" @click="isExpanded = !isExpanded">
        {{ isExpanded ? 'Hide' : 'Show' }} Transaction History
    </button>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';

const globalsStore = useGlobalsStore();

const isExpanded = ref(true);
</script>