<template>
    <h1 class="p-2 text-xl font-bold text-center mt-4">{{ globalsStore.language === 'en' ? 'Savings Tracker' :
        'Urmăritor de Economii'
    }}
    </h1>
    <div class="w-full bg-gray-100 max-w-7xl mx-auto shadow-lg rounded-lg border">
        <table class="w-full border-collapse mx-auto">
            <thead class="bg-gray-300 text-center">
                <tr>
                    <th class="py-2 w-1/7 border-b">{{ globalsStore.language == 'en' ? 'Month' : 'Luna' }}</th>
                    <th class="py-2 w-1/7 border-b">{{ globalsStore.language == 'en' ? 'Amount Saved'
                        : 'Suma Salvată' }}
                    </th>
                    <th class="py-2 w-1/7 border-b">{{ globalsStore.language == 'en' ? 'Total Saved'
                        : 'Total Salvat' }}
                    </th>
                    <th class="py-2 w-1/7 border-b">{{ globalsStore.language == 'en' ? 'Amount Remaining'
                        : 'Suma Rămasă' }}</th>
                    <th class="py-2 w-1/7 border-b">{{ globalsStore.language == 'en' ? 'Monthly Required'
                        : 'Suma Necesară Lunar' }}</th>
                    <th class="py-2 w-1/7 border-b">{{ globalsStore.language == 'en' ? 'Goal' : 'Suma Obiectiv' }}</th>
                    <th class="py-2 w-1/7 border-b">{{ globalsStore.language == 'en' ? 'Actions' : 'Acțiuni' }}</th>
                </tr>
            </thead>
            <tbody class="text-center bg-gray-100" v-show="isExpanded">
                <tr v-for="(contribution, index) in savingsStore.contributions" :key="index">
                    <td class="py-2 w-1/7 border-b">{{ contribution.date }}</td>
                    <td class="py-2 w-1/7 border-b">{{ globalsStore.currency === 'pound' ? '£' :
                        globalsStore.currency === 'euro' ? '€' : '' }}{{ contribution.amount }}
                        {{ globalsStore.currency === 'lei' ? 'lei' : '' }}</td>
                    <td class="py-2 w-1/7 border-b">{{ globalsStore.currency === 'pound' ? '£' :
                        globalsStore.currency === 'euro' ? '€' : '' }}{{
                            savingsStore.getTotalUpToContributionIndex(index) +
                            savingsStore.startingAmount }} {{ globalsStore.currency === 'lei' ? 'lei' : '' }}</td>
                    <td class="py-2 w-1/7 border-b">{{ globalsStore.currency === 'pound' ? '£' :
                        globalsStore.currency === 'euro' ? '€' : '' }}{{ savingsStore.getRemainingByIndex(index) }} {{
                            globalsStore.currency === 'lei' ? 'lei' : '' }}</td>
                    <td class="py-2 w-1/7 border-b">{{ globalsStore.currency === 'pound' ? '£' :
                        globalsStore.currency === 'euro' ? '€' : '' }}{{
                            savingsStore.getRequiredMonthlyContributionByDate(index, contribution.date) }} {{
                            globalsStore.currency === 'lei' ? 'lei' : '' }}</td>
                    <td class="py-2 w-1/7 border-b">{{ globalsStore.currency === 'pound' ? '£' :
                        globalsStore.currency === 'euro' ? '€' : '' }}{{ savingsStore.target }} {{ globalsStore.currency
                            === 'lei' ? 'lei' : '' }}</td>
                    <td class="py-2 w-1/7 border-b">
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
    </div>
</template>
<script setup lang="ts">
import { useSavingsStore } from '@/stores/savings-store';
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';
const savingsStore = useSavingsStore();
const globalsStore = useGlobalsStore();
const isExpanded = ref(true);
</script>