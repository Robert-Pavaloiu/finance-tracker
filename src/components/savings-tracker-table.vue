<template>
    <h1 class="p-2 text-xl font-bold text-center mt-4 dark:text-white">{{ globalsStore.language === 'en'
        ? 'Savings Tracker' :
        'Urmăritor de Economii'
    }}
    </h1>
    <div class="w-full bg-gray-100 dark:bg-gray-800 max-w-7xl mx-auto shadow-lg rounded-lg border dark:border-gray-700">
        <table class="w-full border-collapse mx-auto">
            <thead class="bg-gray-300 dark:bg-gray-700 dark:text-white text-center">
                <tr>
                    <th class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ==
                        'en' ? 'Date' : 'Data' }}</th>
                    <th class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ==
                        'en' ? 'Amount Saved'
                        : 'Suma Salvată' }}
                    </th>
                    <th class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ==
                        'en' ? 'Total Saved'
                        : 'Total Salvat' }}
                    </th>
                    <th class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ==
                        'en' ? 'Amount Remaining'
                        : 'Suma Rămasă' }}</th>
                    <th class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ==
                        'en' ? 'Monthly Required'
                        : 'Suma Necesară Lunar' }}</th>
                    <th class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ==
                        'en' ? 'Goal' : 'Suma Obiectiv' }}</th>
                    <th class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{ globalsStore.language ==
                        'en' ? 'Actions' : 'Acțiuni' }}</th>
                </tr>
            </thead>
            <tbody class="text-center bg-gray-100 dark:bg-gray-800 dark:text-white" v-show="isExpanded">
                <tr v-for="(contribution, index) in savingsStore.contributions" :key="index">
                    <td class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{
                        formatDate(contribution.date) }}</td>
                    <td class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{
                        formatAmount(contribution.amount) }}</td>
                    <td class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{
                        formatAmount(savingsStore.getTotalUpToContributionIndex(index) +
                            savingsStore.startingAmount) }}</td>
                    <td class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{
                        formatAmount(savingsStore.getRemainingByIndex(index)) }}</td>
                    <td class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{
                        formatAmount(savingsStore.getRequiredMonthlyContributionByDate(index, contribution.date)) }}
                    </td>
                    <td class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">{{
                        formatAmount(savingsStore.target) }} </td>
                    <td class="py-2 w-1/7 border-b dark:border-gray-700 dark:text-gray-200">
                        <button
                            class="bg-blue-600 hover:bg-blue-700 text-white p-1 px-2 rounded-lg shadow-lg border-2 border-blue-800 mr-2"
                            @click="openEdit(contribution, index)">
                            {{ globalsStore.language === 'en' ? 'Edit' : 'Editează' }}
                        </button>
                        <button
                            class="bg-red-600 hover:bg-red-700 text-white p-1 rounded-lg shadow-lg border-2 border-red-800"
                            @click="savingsStore.contributions.splice(index, 1)">{{ globalsStore.language === 'en' ?
                                'Delete' : 'Șterge' }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button
            class="bg-green-600 hover:bg-green-700 text-white p-2 m-2 rounded-lg shadow-lg border-2 border-green-800"
            @click="isExpanded = !isExpanded"> {{
                isExpanded ? (globalsStore.language === 'en' ? 'Hide'
                    : 'Ascunde') : (globalsStore.language === 'en' ? 'Show' : 'Afișează') }} {{ globalsStore.language === 'en' ?
                'Savings History' : 'Istoricul de Economie' }}
        </button>
        <EditContributionModal v-if="editingContribution" :contribution="editingContribution.contribution"
            @close="editingContribution = null" @save="saveEdit" />
    </div>
</template>
<script setup lang="ts">
import { useSavingsStore } from '@/stores/savings-store';
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';
import { useDate } from '@/composables/useDate'
import { useCurrency } from '@/composables/useCurrency';
import EditContributionModal from '@/components/edit-contribution-modal.vue'

const { formatAmount } = useCurrency();
const { formatDate } = useDate()
const savingsStore = useSavingsStore();
const globalsStore = useGlobalsStore();
const isExpanded = ref(true);

const editingContribution = ref<{ contribution: { date: string; amount: number }; index: number } | null>(null)

const openEdit = (contribution: { date: string; amount: number }, index: number) => {
    editingContribution.value = { contribution, index }
}

const saveEdit = (updates: Partial<{ date: string; amount: number }>) => {
    if (editingContribution.value) {
        savingsStore.editContribution(editingContribution.value.index, updates)
        editingContribution.value = null
    }
}

</script>