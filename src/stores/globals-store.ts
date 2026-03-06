import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  Transaction,
  Currency,
  GlobalsState,
  MonthlyEarnings,
  MonthlyExpenses,
  Language,
} from '@/types'

function computeRecurringDate(
  day: number,
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth(),
): string {
  // clamp the day to the maximum number of days in the given month/year
  const maxDay = new Date(year, month + 1, 0).getDate()
  const adjusted = Math.min(day, maxDay)
  const date = new Date(year, month, adjusted)
  return date.toISOString()
}

export const useGlobalsStore: () => GlobalsState = defineStore('globals', () => {
  const darkMode = ref<boolean>(false)
  const language = ref<Language>('en')
  const currency = ref<Currency>('pound')
  const transactionHistory = ref<Transaction[]>([])

  // default recurring day: today
  const defaultDay = new Date().getDate()
  const monthlyEarnings = ref<MonthlyEarnings>({
    recurringDay: defaultDay,
    recurringDate: computeRecurringDate(defaultDay),
    amount: 0,
  })

  function setRecurringDay(day: number) {
    monthlyEarnings.value.recurringDay = day
    monthlyEarnings.value.recurringDate = computeRecurringDate(day)
  }

  /**
   * Returns the recurring date for any given month/year based on the stored day.
   * Useful when calculating payments for future months.
   */
  const monthlyExpenses = ref<MonthlyExpenses>({
    recurringDay: 1,
    recurringDate: computeRecurringDate(1),
    amount: 0,
  })

  function setRecurringRentDay(day: number) {
    monthlyExpenses.value.recurringDay = day
    monthlyExpenses.value.recurringDate = computeRecurringDate(day)
    addRentTransaction()
  }

  function setRentAmount(amount: number) {
    monthlyExpenses.value.amount = amount
    addRentTransaction()
  }

  function addRentTransaction() {
    // remove existing rent transactions
    transactionHistory.value = transactionHistory.value.filter((t) => t.category !== 'Rent')
    if (monthlyExpenses.value.amount > 0) {
      const rentDate = new Date(monthlyExpenses.value.recurringDate)
      transactionHistory.value.push({
        id: Date.now(),
        category: 'Rent',
        amount: monthlyExpenses.value.amount,
        date: rentDate.toLocaleDateString(),
        isRecurring: true,
      })
    }
  }

  /**
   * Returns the recurring date for any given month/year based on the stored day.
   * Useful when calculating payments for future months.
   */
  function getRecurringDateForMonth(year: number, month: number) {
    return computeRecurringDate(monthlyEarnings.value.recurringDay, year, month)
  }

  const leftoverBudget = computed<number>(
    () =>
      monthlyEarnings.value.amount -
      transactionHistory.value.reduce((total, transaction) => total + transaction.amount, 0),
  )

  return {
    darkMode,
    currency,
    transactionHistory,
    monthlyEarnings,
    monthlyExpenses,
    leftoverBudget,
    setRecurringDay,
    getRecurringDateForMonth,
    setRecurringRentDay,
    setRentAmount,
    language,
  }
})
