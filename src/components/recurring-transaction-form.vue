<template>
    <form>
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label for="recurringAmount">{{ globalsStore.language === 'en' ? 'Amount:' : 'Sumă:' }}</label>
            <input type="number" id="recurringAmount" v-model="recurringTransaction.amount"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />

            <label for="recurringCategory">{{ globalsStore.language === 'en' ? 'Category:' : 'Categorie:' }}</label>
            <select id="recurringCategory" v-model="recurringTransaction.category"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white">
                <option value="" disabled>{{ globalsStore.language === 'en' ? 'Select a category'
                    : 'Selectează o categorie' }}</option>
                <option
                    v-for="category in Object.values(RecurringCategories).filter(cat => cat !== RecurringCategories[0])"
                    :key="category" :value="category">
                    {{ translateCategory(category) }}
                </option>
            </select>

            <label for="recurringDescription">{{ globalsStore.language === 'en' ? 'Description:' : 'Descriere:'
                }}</label>
            <input type="text" id="recurringDescription" v-model="recurringTransaction.description"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />

            <label for="recurringDay">{{ globalsStore.language === 'en' ? 'Recurring Day:' : 'Ziua Recurentă:'
                }}</label>
            <input type="number" id="recurringDay" v-model.number="recurringTransaction.recurringDay" :min="1" :max="31"
                class="border rounded p-2 dark:bg-gray-700 dark:text-white" />
        </div>
        <div class="flex justify-center mt-4">
            <button type="submit"
                class="bg-green-600 hover:bg-green-700 text-white p-2 px-6 rounded-lg shadow-lg border-2 border-green-800"
                v-on:click.prevent="addRecurringTransaction">
                {{ globalsStore.language === 'en' ? 'Add Recurring Transaction' : 'Adaugă Tranzacție Recurentă' }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';
import { RecurringCategories } from '@/enums';
import { useCategory } from '@/composables/useCategory'
const { translateCategory } = useCategory()

const globalsStore = useGlobalsStore();

const recurringTransaction = ref<{
    amount: number;
    category: typeof RecurringCategories[number] | '';
    description: string;
    recurringDay: number;
}>({
    amount: 0,
    category: '',
    description: '',
    recurringDay: 1
});

const addRecurringTransaction = () => {
    if (recurringTransaction.value.category && recurringTransaction.value.amount > 0) {
        globalsStore.addRecurringExpense(
            recurringTransaction.value.category as typeof RecurringCategories[number],
            recurringTransaction.value.recurringDay,
            recurringTransaction.value.amount,
            recurringTransaction.value.description || undefined
        );
        // Reset form
        recurringTransaction.value = {
            amount: 0,
            category: '',
            description: '',
            recurringDay: 1
        };
    }
};
</script>