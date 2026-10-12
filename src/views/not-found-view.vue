<template>
    <main class="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center">
        <h1 class="text-4xl font-bold dark:text-white">404</h1>
        <p class="dark:text-gray-300">{{ globalsStore.language === 'en' ? "That page doesn't exist."
            : "Pagina nu există." }}</p>
        <RouterLink to="/"
            class="relative w-32 h-6 rounded-full transition-colors duration-300 focus:outline-none dark:text-white"
            :class="globalsStore.darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'">{{
                globalsStore.language
                    === 'en' ?
                    'Back to home' : 'Înapoi acasă' }}</RouterLink>
    </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useGlobalsStore } from '@/stores/globals-store'
const globalsStore = useGlobalsStore()
</script>
