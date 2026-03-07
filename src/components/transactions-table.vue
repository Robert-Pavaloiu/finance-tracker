<template>
    <h1 class="p-2 text-xl font-bold">{{ globalsStore.language === 'en' ? 'Transactions' : 'Tranzacții' }}</h1>
    <table class="w-full bg-white">
        <thead class="bg-gray-200 text-center">
            <tr>
                <th class="py-2 w-1/4 border-b">{{ globalsStore.language === 'en' ? 'Date' : 'Data' }}</th>
                <th class="py-2 w-1/4 border-b">{{ globalsStore.language === 'en' ? 'Amount' : 'Sumă' }}</th>
                <th class="py-2 w-1/4 border-b">{{ globalsStore.language === 'en' ? 'Category' : 'Categorie' }}</th>
                <th class="py-2 w-1/4 border-b">{{ globalsStore.language === 'en' ? 'Actions' : 'Acțiuni' }}</th>
            </tr>
        </thead>
        <tbody class="text-center" v-show="isExpanded">
            <tr v-for="(transaction, index) in globalsStore.transactionHistory" :key="index">
                <td class="py-2 w-1/4 border-b">{{ transaction.date }}</td>
                <td class="py-2 w-1/4 border-b">{{ globalsStore.currency === 'pound' ? '£' : globalsStore.currency ===
                    'euro' ? '€' : '' }}{{ transaction.amount }} {{ globalsStore.currency === 'lei' ? 'lei' : '' }}
                </td>
                <td class="py-2 w-1/4 border-b">{{ transaction.category }}</td>
                <td class="py-2 w-1/4 border-b">
                    <button class="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                        @click="deleteTransaction(index)">{{ globalsStore.language === 'en' ? 'Delete' : 'Șterge'
                        }}</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="bg-green-600 hover:bg-green-700 text-white p-2 m-2 rounded" @click="isExpanded = !isExpanded"> {{
        isExpanded ? (globalsStore.language === 'en' ? 'Hide'
            : 'Ascunde') : (globalsStore.language === 'en' ? 'Show' : 'Afișează') }} {{ globalsStore.language === 'en' ?
            'Transaction History' : 'Istoricul Tranzacțiilor' }}
    </button>
    <button class="bg-red-600 hover:bg-red-700 text-white p-2 m-2 rounded" @click="toggleClearAllModal">
        {{ globalsStore.language === 'en' ? 'Clear All Transactions' : 'Șterge Toate Tranzacțiile' }}
    </button>
    <ClearAllTransactionsModal v-if="showClearAllModal" @close="toggleClearAllModal"
        @confirm-clear="clearAllTransactions" />
</template>
<script setup lang="ts">
import ClearAllTransactionsModal from '@/components/clear-all-transactions-modal.vue';
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';

const globalsStore = useGlobalsStore();

const isExpanded = ref(true);

const showClearAllModal = ref(false);

const clearAllTransactions = () => {
    // keep only recurring transactions; filter ensures the result is Transaction[]
    globalsStore.transactionHistory = globalsStore.transactionHistory.filter(
        (t) => t.isRecurring
    );
    toggleClearAllModal();
};

const deleteTransaction = (index: number) => {
    globalsStore.transactionHistory.splice(index, 1);
};


const toggleClearAllModal = () => {
    showClearAllModal.value = !showClearAllModal.value;
};
</script>