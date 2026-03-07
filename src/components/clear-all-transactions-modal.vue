<template>
    <div
        class="bg-gray-100 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300">
        <h1 class="p-2 text-2xl font-bold">{{ globalsStore.language === 'en' ?
            'Clear All Transactions' : 'Șterge Toate Tranzacțiile' }}</h1>
        <p class="p-2">{{ globalsStore.language === 'en' ?
            'Are you sure you want to clear all non-recurring transactions? This action cannot be undone.' :
            'Ești sigur că vrei să ștergi toate tranzacțiile non-recurente? Această acțiune nu poate fi anulată.' }}</p>
        <div class="flex justify-end space-x-4 p-2">
            <button @click="$emit('close')"
                class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 border-2 border-gray-500 ">{{
                    globalsStore.language === 'en' ? 'Cancel' : 'Anulează' }}</button>
            <button @click="$emit('confirm-clear')"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 border-2 border-red-700">{{
                    globalsStore.language === 'en' ? 'Clear All' : 'Șterge Toate' }}</button>
        </div>
    </div>
</template>
<script setup lang="ts">
defineEmits(['close', 'confirm-clear']);

import { useGlobalsStore } from '@/stores/globals-store';
const globalsStore = useGlobalsStore();
</script>