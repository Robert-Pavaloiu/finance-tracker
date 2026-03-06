<template>
    <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex items-center justify-between">
            <RouterLink to="/" class="text-white text-lg font-bold">Finance Tracker</RouterLink>
            <ul class="flex space-x-4">
                <li>
                    <RouterLink to="/budgets" class="text-gray-300 hover:text-white">{{ globalsStore.language === 'en' ?
                        'Budget' : 'Buget'}}</RouterLink>
                </li>
                <li>
                    <RouterLink to="/savings-targets" class="text-gray-300 hover:text-white">
                        {{ globalsStore.language === 'en' ? 'Savings Targets' : 'Ținte de Economii' }}
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/settings" class="text-gray-300 hover:text-white">{{ globalsStore.language === 'en' ?
                        'Settings' : 'Setări'}}</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
const globalsStore = useGlobalsStore();
</script>