import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Transaction, Currency, GlobalsState } from '@/types'

export const useGlobalsStore: () => GlobalsState = defineStore('globals', () => {
  const darkMode = ref<boolean>(false)
  const currency = ref<Currency>('pound')
  const transactionHistory = ref<Transaction[]>([])
  const monthlyEarnings = ref<number>(0)
  const leftoverBudget = computed<number>(
    () =>
      monthlyEarnings.value -
      transactionHistory.value.reduce((total, transaction) => total + transaction.amount, 0),
  )
  return { darkMode, currency, transactionHistory, monthlyEarnings, leftoverBudget }
})
