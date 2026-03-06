<template>
    <h1 class="p-2 text-2xl font-bold">Settings</h1>
    <p class="p-2">Here you can adjust your preferences and configure the app to suit your needs.</p>
    <div class="p-2 flex-col items-center mt-4">
        <div>
            <label for="amount" class="pr-2">Monthly Earnings:</label>
            <input type="number" id="amount" v-model="globalsStore.monthlyEarnings" class="border rounded p-2" />
        </div>
        <div class="flex items-center text-center mb-4">
            <label for="darkMode">Enable Dark Mode:</label>
            <input type="checkbox" id="darkMode" v-model="globalsStore.darkMode" class="ml-2" />
        </div>
        <div class="flex items-center text-center">
            <label for="currency" class="block mr-2">Preferred Currency:</label>
            <select v-model="globalsStore.currency" class="mt-2 p-1 border rounded">
                <option disabled value="">Please select one</option>
                <option value="pound">Pound Sterling</option>
                <option value="lei">Romanian Leu</option>
                <option value="euro">Euro</option>
            </select>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
const globalsStore = useGlobalsStore();


</script>