<template>
    <h1 class="text-3xl font-bold text-center mt-6 dark:text-white">{{ globalsStore.language === 'en' ? 'Settings' :
        'Setări' }}</h1>
    <div
        class="flex-col items-center mt-4 bg-gray-100 border p-6 shadow-lg rounded-lg max-w-2xl mx-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <div class="flex items-center my-4">
            <label class="mr-3 dark:text-gray-200">
                {{ globalsStore.language === 'en' ? 'Enable Dark Mode:' : 'Activează Modul Întunecat:' }}
            </label>
            <button @click="globalsStore.darkMode = !globalsStore.darkMode"
                class="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none"
                :class="globalsStore.darkMode ? 'bg-blue-600' : 'bg-gray-300'">
                <span
                    class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                    :class="globalsStore.darkMode ? 'translate-x-6' : 'translate-x-0'" />
            </button>
        </div>
        <div class="flex items-center text-center mb-4">
            <label for="currency" class="block mr-2">{{ globalsStore.language === 'en' ?
                'Preferred Currency:' : 'Moneda Preferată: ' }}</label>
            <select v-model="globalsStore.currency" class="mt-2 p-1 border rounded">
                <option disabled value="">{{ globalsStore.language === 'en' ?
                    'Please select one' : 'Te rog selectează una' }}</option>
                <option value="pound">{{ globalsStore.language === 'en' ? 'Pound Sterling' : 'Liră Sterlină' }}</option>
                <option value="lei">{{ globalsStore.language === 'en' ? 'Romanian Leu' : 'Leu Românesc' }}</option>
                <option value="euro">{{ globalsStore.language === 'en' ? 'Euro' : 'Euro' }}</option>
            </select>
        </div>
        <div class="flex items-center text-center mb-4">
            <label for="language" class="block mr-2">{{ globalsStore.language === 'en' ?
                'Preferred Language:' : 'Limba Preferată: ' }}</label>
            <select v-model="globalsStore.language" class="mt-2 p-1 border rounded">
                <option disabled value="">{{ globalsStore.language === 'en' ?
                    'Please select one' : 'Te rog selectează una' }}</option>
                <option value="en">{{ globalsStore.language === 'en' ? 'English' : 'Engleză' }}</option>
                <option value="ro">{{ globalsStore.language === 'en' ? 'Romanian' : 'Română' }}</option>
            </select>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
const globalsStore = useGlobalsStore();


</script>