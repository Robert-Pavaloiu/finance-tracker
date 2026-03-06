export type Transaction = {
  id: number
  category: string
  amount: number
  date: string
}

export type Currency = 'pound' | 'lei' | 'euro'

export interface GlobalsState {
  darkMode: boolean
  currency: Currency
  transactionHistory: Transaction[]
  monthlyEarnings: number
  leftoverBudget: number
}
