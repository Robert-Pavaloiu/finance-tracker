<template>
    <form>
        <div class="p-2">
            <label for="recurringAmount" class="pr-2">{{ globalsStore.language === 'en' ? 'Amount:' : 'Sumă:' }}</label>
            <input type="number" id="recurringAmount" v-model="recurringTransaction.amount"
                class="border rounded p-2" />
        </div>
        <div class="p-2">
            <label for="recurringCategory" class="pr-2">{{ globalsStore.language === 'en' ? 'Category:' : 'Categorie:'
                }}</label>
            <select id="recurringCategory" v-model="recurringTransaction.category" class="border rounded p-2">
                <option value="" disabled>{{ globalsStore.language === 'en' ? 'Select a category'
                    : 'Selectează o categorie' }}</option>
                <option
                    v-for="category in Object.values(RecurringTransactionCategory).filter(cat => cat !== RecurringTransactionCategory.Rent)"
                    :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
        </div>
        <div class="p-2">
            <label for="recurringDescription" class="pr-2">{{ globalsStore.language === 'en' ? 'Description:' :
                'Descriere:' }}</label>
            <input type="text" id="recurringDescription" v-model="recurringTransaction.description"
                class="border rounded p-2" />
        </div>
        <div class="p-2">
            <label for="recurringDay" class="pr-2">{{ globalsStore.language === 'en' ? 'Recurring Day:'
                : 'Ziua Recurentă: ' }}</label>
            <input type="number" id="recurringDay" v-model.number="recurringTransaction.recurringDay" :min="1" :max="31"
                class="border rounded p-2" />
        </div>
        <button type="submit"
            class="bg-green-600 hover:bg-green-700 text-white p-2 m-2 rounded-lg shadow-lg border-2 border-green-800"
            v-on:click.prevent="addRecurringTransaction">{{ globalsStore.language === 'en' ?
                'Add Recurring Transaction' : 'Adaugă Tranzacție Recurentă' }}</button>
    </form>
</template>

<script setup lang="ts">
import { useGlobalsStore } from '@/stores/globals-store';
import { ref } from 'vue';
import { RecurringTransactionCategory } from '@/enums';

const globalsStore = useGlobalsStore();

const recurringTransaction = ref<{
    amount: number;
    category: RecurringTransactionCategory | '';
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
            recurringTransaction.value.category as RecurringTransactionCategory,
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