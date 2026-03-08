<template>
    <h1 class="p-2 text-xl font-bold text-center mt-4">{{ globalsStore.language === 'en' ? 'Recurring Transactions' :
        'Tranzacții Recurente'
    }}
    </h1>
    <div class="w-full bg-gray-100 max-w-5xl mx-auto shadow-lg rounded-lg border">
        <table class="w-full border-collapse mx-auto">
            <thead class="bg-gray-300 text-center">
                <tr>
                    <th class="py-2 w-1/5 border-b">{{ globalsStore.language === 'en' ? 'Recurring Day'
                        : 'Ziua Recurentă' }}</th>
                    <th class="py-2 w-1/5 border-b">{{ globalsStore.language === 'en' ? 'Amount' : 'Sumă' }}</th>
                    <th class="py-2 w-1/5 border-b">{{ globalsStore.language === 'en' ? 'Category' : 'Categorie' }}</th>
                    <th class="py-2 w-1/5 border-b">{{ globalsStore.language === 'en' ? 'Description' : 'Descriere' }}
                    </th>
                    <th class="py-2 w-1/5 border-b">{{ globalsStore.language === 'en' ? 'Actions' : 'Acțiuni' }}</th>
                </tr>
            </thead>
            <tbody class="text-center bg-gray-100" v-show="isExpanded">
                <tr v-for="(transaction, index) in globalsStore.recurringExpenses" :key="index">
                    <td class="py-2 w-1/5 border-b">{{ transaction.recurringDay }}{{ dayEndsIn(transaction.recurringDay)
                        }}</td>
                    <td class="py-2 w-1/5 border-b">{{ formatAmount(transaction.amount) }}</td>
                    <td class="py-2 w-1/5 border-b">{{ translateCategory(transaction.category) }}</td>
                    <td class="py-2 w-1/5 border-b">{{ transaction.description }}</td>
                    <td class="py-2 w-1/5 border-b">
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
                'Recurring Transactions' : 'Tranzacții Recurente' }}
        </button>
    </div>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { useCurrency } from '@/composables/useCurrency';
import { ref } from 'vue';
import { useCategory } from '@/composables/useCategory'
const { translateCategory } = useCategory()

const globalsStore = useGlobalsStore();
const { formatAmount } = useCurrency();

const isExpanded = ref(true);


const deleteTransaction = (index: number) => {
    globalsStore.recurringExpenses.splice(index, 1);
};


const dayEndsIn = (day: number) => {
    if (globalsStore.language === 'ro') {
        return '';
    }

    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};
</script>