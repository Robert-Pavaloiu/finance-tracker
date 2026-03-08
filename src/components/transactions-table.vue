<template>
    <h1 class="p-2 text-xl font-bold text-center mt-4 dark:text-white">{{ globalsStore.language === 'en' ?
        'Transactions' :
        'Tranzacții'
        }}
    </h1>
    <div class="w-full bg-gray-100 dark:bg-gray-800 max-w-5xl mx-auto shadow-lg rounded-lg border dark:border-gray-700">
        <table class="w-full border-collapse mx-auto">
            <thead class="bg-gray-300 text-center dark:bg-gray-700 dark:text-white">
                <tr>
                    <th class="py-2 w-1/4 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ===
                        'en' ? 'Date' : 'Data' }}</th>
                    <th class="py-2 w-1/4 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ===
                        'en' ? 'Amount' : 'Sumă' }}</th>
                    <th class="py-2 w-1/4 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ===
                        'en' ? 'Category' : 'Categorie' }}</th>
                    <th class="py-2 w-1/4 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ===
                        'en' ? 'Actions' : 'Acțiuni' }}</th>
                </tr>
            </thead>
            <tbody class="text-center bg-gray-100 dark:bg-gray-800" v-show="isExpanded">
                <tr v-for="(transaction, index) in globalsStore.transactionHistory" :key="transaction.id">
                    <td class="py-2 w-1/4 border-b dark:border-gray-700 dark:text-gray-200">{{
                        formatDate(transaction.date) }}</td>
                    <td class="py-2 w-1/4 border-b dark:border-gray-700 dark:text-gray-200">{{
                        formatAmount(transaction.amount) }}</td>
                    <td class="py-2 w-1/4 border-b dark:border-gray-700 dark:text-gray-200">{{
                        translateCategory(transaction.category) }}</td>
                    <td class="py-2 w-1/4 border-b dark:border-gray-700 dark:text-gray-200">
                        <button
                            class="bg-blue-600 hover:bg-blue-700 text-white p-1 px-2 rounded-lg shadow-lg border-2 border-blue-800 mr-2"
                            @click="openEdit(transaction)">
                            {{ globalsStore.language === 'en' ? 'Edit' : 'Editează' }}
                        </button>
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
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="showClearAllModal">
            <ClearAllTransactionsModal @close="toggleClearAllModal" @confirm-clear="clearAllTransactions" />
        </div>

        <EditTransactionModal v-if="editingTransaction" :transaction="editingTransaction"
            @close="editingTransaction = null" @save="saveEdit" />
    </div>
</template>
<script setup lang="ts">
import ClearAllTransactionsModal from '@/components/clear-all-transactions-modal.vue';
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';
import { useDate } from '@/composables/useDate';
import { useCurrency } from '@/composables/useCurrency';
import { useCategory } from '@/composables/useCategory';
import EditTransactionModal from '@/components/edit-transaction-modal.vue'
import type { Transaction } from '@/types'

const { translateCategory } = useCategory();

const { formatDate } = useDate();
const { formatAmount } = useCurrency();

const globalsStore = useGlobalsStore();

const isExpanded = ref(true);

const showClearAllModal = ref(false);

const editingTransaction = ref<Transaction | null>(null)

const openEdit = (transaction: Transaction) => {
    editingTransaction.value = transaction
}

const saveEdit = (updates: Partial<Transaction>) => {
    if (editingTransaction.value) {
        globalsStore.editTransaction(editingTransaction.value.id, updates)
        editingTransaction.value = null
    }
}


const clearAllTransactions = () => {
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