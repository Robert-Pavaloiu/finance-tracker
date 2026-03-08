import type { RecurringCategories, TransactionCategory } from './enums'

export type Transaction = {
  id: string
  category: TransactionCategory
  amount: number
  date?: string
  isRecurring?: boolean
}

export type Currency = 'pound' | 'lei' | 'euro'

export type MonthlyEarnings = {
  /** numeric day of month the expense recurs (1-31) */
  recurringDay: number
  /** ISO string for a date calculated from recurringDay using the current month/year */
  recurringDate: string
  amount: number
}

export type RecurringExpense = {
  category: (typeof RecurringCategories)[number]
  description?: string
  /** numeric day of month the expense recurs (1-31) */
  recurringDay: number
  /** ISO string for a date calculated from recurringDay using the current month/year */
  recurringDate: string
  amount: number
}

export type Language = 'en' | 'ro'

export type Contribution = { date: string; amount: number }

export interface GlobalsState {
  currency: Currency
  language: Language
  transactionHistory: Transaction[]
  monthlyEarnings: MonthlyEarnings
  recurringExpenses: RecurringExpense[]
  leftoverBudget: number
  totalExpenses: number
  setRecurringDay: (day: number) => void
  getRecurringDateForMonth: (year: number, month: number) => string
  setRecurringExpenseDay: (category: (typeof RecurringCategories)[number], day: number) => void
  setRecurringExpenseAmount: (
    category: (typeof RecurringCategories)[number],
    amount: number,
  ) => void
  addRecurringExpense: (
    category: (typeof RecurringCategories)[number],
    recurringDay: number,
    amount: number,
    description?: string,
  ) => void
  setRentAmount: (amount: number) => void
  setRecurringRentDay: (day: number) => void
  ensureRentExpense: () => void
  editTransaction: (id: string, updates: Partial<Transaction>) => void
  editRecurringExpense: (index: number, updates: Partial<RecurringExpense>) => void
  darkMode: boolean
}

export interface SavingsState {
  target: number
  targetDate: string
  startingAmount: number
  contributions: Contribution[]
  totalSaved: number
  remainingAmount: number
  monthsRemaining: number
  requiredMonthlyContribution: number
  getTotalUpToContributionIndex: (index: number) => number
  getRequiredMonthlyContributionByDate: (index: number, date: string) => number
  getRemainingByIndex: (index: number) => number
  editContribution: (index: number, updates: Partial<{ date: string; amount: number }>) => void
}
