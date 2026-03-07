export type Transaction = {
  id: number
  category: string
  amount: number
  date: string
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
  category: string
  description?: string
  /** numeric day of month the expense recurs (1-31) */
  recurringDay: number
  /** ISO string for a date calculated from recurringDay using the current month/year */
  recurringDate: string
  amount: number
}

export type Language = 'en' | 'ro'

export interface GlobalsState {
  darkMode: boolean
  currency: Currency
  language: Language
  transactionHistory: Transaction[]
  monthlyEarnings: MonthlyEarnings
  recurringExpenses: RecurringExpense[]
  leftoverBudget: number
  totalExpenses: number
  setRecurringDay: (day: number) => void
  getRecurringDateForMonth: (year: number, month: number) => string
  setRecurringExpenseDay: (category: string, day: number) => void
  setRecurringExpenseAmount: (category: string, amount: number) => void
  addRecurringExpense: (
    category: string,
    recurringDay: number,
    amount: number,
    description?: string,
  ) => void
  setRentAmount: (amount: number) => void
  setRecurringRentDay: (day: number) => void
  ensureRentExpense: () => void
}
