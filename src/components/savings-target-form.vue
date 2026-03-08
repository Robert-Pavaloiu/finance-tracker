<template>
    <h1 class="p-2 text-xl font-bold text-center">{{ globalsStore.language === 'en' ? 'Target' : 'Obiectiv' }}
    </h1>
    <div class="bg-gray-100 border p-6 shadow-lg rounded-lg max-w-xl mx-auto ">
        <div class="mb-4">
            <label for="Target" class="px-2">{{ globalsStore.language === 'en' ?
                'Savings Target:' : 'Obiectiv de Economii:' }}</label>
            <input type="number" id="Target" v-model="savingsStore.target" class="border rounded p-2" />
        </div>
        <div class="mb-4">
            <label for="TargetDate`" class="px-2">{{ globalsStore.language === 'en' ?
                'Complete by Date:' : 'Data de completare:' }}</label>
            <input type="date" id="TargetDate" v-model="savingsStore.targetDate" class="border rounded p-2" />
        </div>
        <div class="mb-4">
            <label for="StartingAmount" class="px-2">{{ globalsStore.language === 'en' ?
                'Starting Amount:' : 'Suma Inițială:' }}</label>
            <input type="number" id="StartingAmount" v-model="savingsStore.startingAmount" class="border rounded p-2" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { useSavingsStore } from '@/stores/savings-store';
const globalsStore = useGlobalsStore();
const savingsStore = useSavingsStore();
</script>