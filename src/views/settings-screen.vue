<template>
    <div class=" flex-col items-center mt-4 bg-gray-100 border p-6 shadow-lg rounded-lg max-w-2xl mx-auto ">
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