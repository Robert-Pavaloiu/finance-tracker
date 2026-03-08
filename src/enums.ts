export enum TransactionCategory {
  Rent = 'Rent',
  Utilities = 'Utilities',
  Subscriptions = 'Subscriptions',
  Food = 'Food',
  Entertainment = 'Entertainment',
  Transportation = 'Transportation',
  Education = 'Education',
  Other = 'Other',
}

export const RecurringCategories = [
  TransactionCategory.Rent,
  TransactionCategory.Utilities,
  TransactionCategory.Subscriptions,
] as const

export const NonRecurringCategories = [
  TransactionCategory.Food,
  TransactionCategory.Entertainment,
  TransactionCategory.Transportation,
  TransactionCategory.Education,
  TransactionCategory.Other,
] as const
