<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 dark:bg-gray-800 dark:text-white">
            <h2 class="text-xl font-bold mb-4">
                {{ globalsStore.language === 'en' ? 'Edit Transaction' : 'Editează Tranzacție' }}
            </h2>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">
                    {{ globalsStore.language === 'en' ? 'Amount' : 'Sumă' }}
                </label>
                <input type="number" v-model="form.amount"
                    class="border dark:border-gray-600 rounded p-2 w-full bg-white dark:bg-gray-700 dark:text-white" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">
                    {{ globalsStore.language === 'en' ? 'Category' : 'Categorie' }}
                </label>
                <select v-model="form.category"
                    class="border dark:border-gray-600 rounded p-2 w-full bg-white dark:bg-gray-700 dark:text-white">
                    <option v-for="cat in Object.values(NonRecurringCategories)" :key="cat" :value="cat">
                        {{ translateCategory(cat) }}
                    </option>
                </select>
            </div>
            <div class="mb-6">
                <label class="block text-sm font-medium mb-1">
                    {{ globalsStore.language === 'en' ? 'Date' : 'Dată' }}
                </label>
                <input type="date" v-model="form.date"
                    class="border dark:border-gray-600 rounded p-2 w-full bg-white dark:bg-gray-700 dark:text-white" />
            </div>
            <div class="flex justify-end space-x-3">
                <button @click="$emit('close')"
                    class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-600  border-2 border-gray-500 dark:hover:bg-gray-700">
                    {{ globalsStore.language === 'en' ? 'Cancel' : 'Anulează' }}
                </button>
                <button @click="save"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 border-2 border-blue-800">
                    {{ globalsStore.language === 'en' ? 'Save' : 'Salvează' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'
import { NonRecurringCategories } from '@/enums'
import type { Transaction } from '@/types'
import { useCategory } from '@/composables/useCategory'
const { translateCategory } = useCategory()

const props = defineProps<{ transaction: Transaction }>()
const emit = defineEmits(['close', 'save'])

const globalsStore = useGlobalsStore()

const form = ref({
    amount: props.transaction.amount,
    category: props.transaction.category,
    date: props.transaction.date,
})

const save = () => {
    emit('save', form.value)
}
</script>