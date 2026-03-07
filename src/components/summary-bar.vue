<template>
    <nav class="bg-gray-600 p-4 sticky top-15 z-50 shadow-lg">
        <div class="container mx-auto flex items-center text-white">
            <ul class="flex space-x-4 justify-between w-full">
                <li>
                    {{ globalsStore.language === 'en' ? 'Total Income' : 'Venit Total' }}: <div
                        class="font-bold text-green-300 text-center">{{
                            globalsStore.currency === 'pound' ? '£' : globalsStore.currency === 'euro' ? '€' : '' }}{{
                            globalsStore.monthlyEarnings.amount }} {{ globalsStore.currency === 'lei' ? 'lei' : '' }}
                    </div>
                </li>
                <li>
                    {{ globalsStore.language === 'en' ? 'Total Expenses' : 'Cheltuieli Totale' }}: <div
                        class="font-bold text-red-300 text-center">{{
                            globalsStore.currency === 'pound' ? '£' : globalsStore.currency === 'euro' ? '€' : '' }}{{
                            globalsStore.totalExpenses }} {{ globalsStore.currency === 'lei' ? 'lei' : '' }}
                    </div>
                </li>
                <li>
                    {{ globalsStore.language === 'en' ? 'Current Balance' : 'Sold Curent' }}: <div
                        class="font-bold text-blue-300 text-center" :class="{
                            'text-red-400': globalsStore.leftoverBudget < 0
                        }">
                        {{
                            globalsStore.currency === 'pound' ? '£' : globalsStore.currency === 'euro' ? '€' : '' }}{{
                            globalsStore.leftoverBudget }} {{ globalsStore.currency === 'lei' ? 'lei' : '' }}
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
const globalsStore = useGlobalsStore();
</script>