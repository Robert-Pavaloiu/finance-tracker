<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 class="text-xl font-bold mb-4">
                {{ globalsStore.language === 'en' ? 'Edit Recurring Expense' : 'Editează Cheltuială Recurentă' }}
            </h2>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">
                    {{ globalsStore.language === 'en' ? 'Amount' : 'Sumă' }}
                </label>
                <input type="number" v-model="form.amount" class="border rounded p-2 w-full" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">
                    {{ globalsStore.language === 'en' ? 'Description' : 'Descriere' }}
                </label>
                <input type="text" v-model="form.description" class="border rounded p-2 w-full" />
            </div>
            <div class="mb-6">
                <label class="block text-sm font-medium mb-1">
                    {{ globalsStore.language === 'en' ? 'Recurring Day' : 'Ziua Recurentă' }}
                </label>
                <input type="number" v-model.number="form.recurringDay" :min="1" :max="31"
                    class="border rounded p-2 w-full" />
            </div>
            <div class="flex justify-end space-x-3">
                <button @click="$emit('close')"
                    class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 border-2 border-gray-500">
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
import type { RecurringExpense } from '@/types'

const props = defineProps<{ expense: RecurringExpense }>()
const emit = defineEmits(['close', 'save'])
const globalsStore = useGlobalsStore()

const form = ref({
    amount: props.expense.amount,
    description: props.expense.description ?? '',
    recurringDay: props.expense.recurringDay,
})

const save = () => emit('save', form.value)
</script>