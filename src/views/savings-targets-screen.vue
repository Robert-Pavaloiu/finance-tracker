<template>
    <p class="p-2">{{ globalsStore.language === 'en' ?
        'Set your savings goals and track your progress towards achieving them.' :
        'Setează-ți obiectivele de economii și urmărește progresul către realizarea lor.' }}</p>
    <div class="p-2 flex-col items-center mt-4">
        <!-- Savings targets form and display will go here -->
        <p class="text-gray-500">{{ globalsStore.language === 'en' ?
            'This feature is coming soon!' : 'Această funcție va fi disponibilă în curând!' }}</p>
    </div>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
const globalsStore = useGlobalsStore();
</script>