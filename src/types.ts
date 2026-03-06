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

export type MonthlyExpenses = {
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
  monthlyExpenses: MonthlyExpenses
  leftoverBudget: number
  setRecurringDay: (day: number) => void
  getRecurringDateForMonth: (year: number, month: number) => string
  setRecurringRentDay: (day: number) => void
  setRentAmount: (amount: number) => void
}
