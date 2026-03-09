import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  Transaction,
  Currency,
  GlobalsState,
  MonthlyEarnings,
  RecurringExpense,
  Language,
} from '@/types'
import { RecurringCategories, TransactionCategory } from '@/enums'

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

export const useGlobalsStore: () => GlobalsState = defineStore(
  'globals',
  () => {
    const language = ref<Language>('en')
    const currency = ref<Currency>('pound')
    const transactionHistory = ref<Transaction[]>([])
    const darkMode = ref<boolean>(false)

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

    const recurringExpenses = ref<RecurringExpense[]>([])

    function setRecurringExpenseDay(category: string, day: number) {
      const expense = recurringExpenses.value.find((e) => e.category === category)
      if (expense) {
        expense.recurringDay = day
        expense.recurringDate = computeRecurringDate(day)
        // if rent, drop any other rent entries
        if (category === TransactionCategory.Rent) {
          recurringExpenses.value = recurringExpenses.value.filter(
            (e) => e === expense || e.category !== TransactionCategory.Rent,
          )
        }
        rebuildRecurringTransactions()
      }
    }

    function setRecurringExpenseAmount(category: string, amount: number) {
      const expense = recurringExpenses.value.find((e) => e.category === category)
      if (expense) {
        expense.amount = amount
        if (category === TransactionCategory.Rent) {
          recurringExpenses.value = recurringExpenses.value.filter(
            (e) => e === expense || e.category !== TransactionCategory.Rent,
          )
        }
        rebuildRecurringTransactions()
      }
    }

    function addRecurringExpense(
      category: (typeof RecurringCategories)[number],
      recurringDay: number,
      amount: number,
      description?: string,
    ) {
      // Only enforce uniqueness for Rent
      if (category === TransactionCategory.Rent) {
        const existingRent = recurringExpenses.value.find(
          (e) => e.category === TransactionCategory.Rent,
        )
        if (existingRent) return
      }

      const recurringDate = computeRecurringDate(recurringDay)
      recurringExpenses.value.push({ category, description, recurringDay, amount, recurringDate })
      rebuildRecurringTransactions()
    }

    function ensureRentExpense() {
      if (!recurringExpenses.value.find((e) => e.category === TransactionCategory.Rent)) {
        addRecurringExpense(TransactionCategory.Rent, 1, 0, 'Monthly rent payment')
      }
    }

    // Initialize rent as a recurring expense if not present
    ensureRentExpense()

    function setRentAmount(amount: number) {
      setRecurringExpenseAmount(TransactionCategory.Rent, amount)
    }

    function setRecurringRentDay(day: number) {
      setRecurringExpenseDay(TransactionCategory.Rent, day)
    }

    function rebuildRecurringTransactions() {
      // Remove all recurring transactions
      transactionHistory.value = transactionHistory.value.filter((t) => !t.isRecurring)
      recurringExpenses.value.forEach((expense) => {
        const cat =
          expense.category === TransactionCategory.Rent
            ? TransactionCategory.Rent
            : expense.category
        if (expense.amount > 0) {
          const date = new Date(expense.recurringDate)
          transactionHistory.value.push({
            id: crypto.randomUUID(),
            category: cat,
            amount: expense.amount,
            date: date.toLocaleDateString('en-GB'),
            isRecurring: true,
          })
        }
      })
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

    const totalExpenses = computed<number>(
      () => monthlyEarnings.value.amount - leftoverBudget.value,
    )

    function editTransaction(id: string, updates: Partial<Transaction>) {
      const index = transactionHistory.value.findIndex((t) => t.id === id)
      if (index !== -1 && transactionHistory.value[index]) {
        transactionHistory.value[index] = {
          ...transactionHistory.value[index],
          ...updates,
        }
      }
    }

    function editRecurringExpense(index: number, updates: Partial<RecurringExpense>) {
      if (recurringExpenses.value[index]) {
        recurringExpenses.value[index] = {
          ...recurringExpenses.value[index],
          ...updates,
        }
        rebuildRecurringTransactions()
      }
    }

    return {
      currency,
      transactionHistory,
      monthlyEarnings,
      recurringExpenses,
      leftoverBudget,
      setRecurringDay,
      getRecurringDateForMonth,
      setRecurringExpenseDay,
      totalExpenses,
      setRecurringExpenseAmount,
      addRecurringExpense,
      setRentAmount,
      setRecurringRentDay,
      ensureRentExpense,
      editTransaction,
      editRecurringExpense,
      language,
      darkMode,
      rebuildRecurringTransactions,
    }
  },
  {
    persist: true,
  },
)
