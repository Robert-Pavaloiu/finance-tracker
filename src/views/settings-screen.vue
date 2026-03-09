<template>
    <h1 class="text-3xl font-bold text-center mt-6 dark:text-white">{{ globalsStore.language === 'en' ? 'Settings' :
        'Setări' }}</h1>
    <div
        class="mt-4 bg-gray-100 border p-6 shadow-lg rounded-lg max-w-2xl mx-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-6">
            <label class="dark:text-gray-200">
                {{ globalsStore.language === 'en' ? 'Enable Dark Mode:' : 'Activează Modul Întunecat:' }}
            </label>
            <div class="flex items-center">
                <button @click="globalsStore.darkMode = !globalsStore.darkMode"
                    class="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none"
                    :class="globalsStore.darkMode ? 'bg-blue-600' : 'bg-gray-300'">
                    <span
                        class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                        :class="globalsStore.darkMode ? 'translate-x-6' : 'translate-x-0'" />
                </button>
            </div>

            <label for="currency">{{ globalsStore.language === 'en' ? 'Preferred Currency:' : 'Moneda Preferată:'
            }}</label>
            <select id="currency" v-model="globalsStore.currency"
                class="p-1 border rounded dark:bg-gray-700 dark:text-white">
                <option disabled value="">{{ globalsStore.language === 'en' ? 'Please select one'
                    : 'Te rog selectează una' }}</option>
                <option value="pound">{{ globalsStore.language === 'en' ? 'Pound Sterling' : 'Liră Sterlină' }}</option>
                <option value="lei">{{ globalsStore.language === 'en' ? 'Romanian Leu' : 'Leu Românesc' }}</option>
                <option value="euro">{{ globalsStore.language === 'en' ? 'Euro' : 'Euro' }}</option>
            </select>

            <label for="language">{{ globalsStore.language === 'en' ? 'Preferred Language:' : 'Limba Preferată:'
            }}</label>
            <select id="language" v-model="globalsStore.language"
                class="p-1 border rounded dark:bg-gray-700 dark:text-white">
                <option disabled value="">{{ globalsStore.language === 'en' ? 'Please select one'
                    : 'Te rog selectează una' }}</option>
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