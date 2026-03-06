<template>
    <h1 class="p-2 text-2xl font-bold">{{ globalsStore.language === 'en' ? 'Settings' : 'Setări' }}</h1>
    <p class="p-2">{{ globalsStore.language === 'en' ?
        'Here you can adjust your preferences and configure the app to suit your needs.' :
        'Aici poți ajusta preferințele tale și configura aplicația pentru a se potrivi nevoilor tale.' }}</p>
    <div class="p-2 flex-col items-center mt-4">
        <div class="flex items-center text-center mb-4">
            <label for="darkMode">{{ globalsStore.language === 'en' ? 'Enable Dark Mode:' : 'Activează Modul Întunecat:'
            }}</label>
            <input type="checkbox" id="darkMode" v-model="globalsStore.darkMode" class="ml-2" />
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