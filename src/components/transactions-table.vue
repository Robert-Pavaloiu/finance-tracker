<template>
    <h1 class="p-2 text-xl font-bold text-center mt-4">{{ globalsStore.language === 'en' ? 'Transactions' : 'Tranzacții'
        }}
    </h1>
    <div class="w-full bg-gray-100 max-w-5xl mx-auto shadow-lg rounded-lg border">
        <table class="w-full border-collapse mx-auto">
            <thead class="bg-gray-300 text-center">
                <tr>
                    <th class="py-2 w-1/4 border-b">{{ globalsStore.language === 'en' ? 'Date' : 'Data' }}</th>
                    <th class="py-2 w-1/4 border-b">{{ globalsStore.language === 'en' ? 'Amount' : 'Sumă' }}</th>
                    <th class="py-2 w-1/4 border-b">{{ globalsStore.language === 'en' ? 'Category' : 'Categorie' }}</th>
                    <th class="py-2 w-1/4 border-b">{{ globalsStore.language === 'en' ? 'Actions' : 'Acțiuni' }}</th>
                </tr>
            </thead>
            <tbody class="text-center bg-gray-100" v-show="isExpanded">
                <tr v-for="(transaction, index) in globalsStore.transactionHistory" :key="index">
                    <td class="py-2 w-1/4 border-b">{{ transaction.date }}</td>
                    <td class="py-2 w-1/4 border-b">{{ globalsStore.currency === 'pound' ? '£' :
                        globalsStore.currency === 'euro' ? '€' : '' }}{{ transaction.amount }}
                        {{ globalsStore.currency === 'lei' ? 'lei' : '' }}
                    </td>
                    <td class="py-2 w-1/4 border-b">{{ transaction.category }}</td>
                    <td class="py-2 w-1/4 border-b">
                        <button
                            class="bg-red-600 hover:bg-red-700 text-white p-1 rounded-lg shadow-lg border-2 border-red-800"
                            @click="deleteTransaction(index)">{{ globalsStore.language === 'en' ? 'Delete' : 'Șterge'
                            }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button
            class="bg-green-600 hover:bg-green-700 text-white p-2 m-2 rounded-lg shadow-lg border-2 border-green-800"
            @click="isExpanded = !isExpanded"> {{
                isExpanded ? (globalsStore.language === 'en' ? 'Hide'
                    : 'Ascunde') : (globalsStore.language === 'en' ? 'Show' : 'Afișează') }} {{ globalsStore.language === 'en' ?
                'Transaction History' : 'Istoricul Tranzacțiilor' }}
        </button>
        <button class="bg-red-600 hover:bg-red-700 text-white p-2 m-2 rounded-lg shadow-lg border-2 border-red-800"
            @click="toggleClearAllModal">
            {{ globalsStore.language === 'en' ? 'Clear All Transactions' : 'Șterge Toate Tranzacțiile' }}
        </button>
        <ClearAllTransactionsModal v-if="showClearAllModal" @close="toggleClearAllModal"
            @confirm-clear="clearAllTransactions" />
    </div>
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