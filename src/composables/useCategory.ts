import { useGlobalsStore } from '@/stores/globals-store'
import { TransactionCategory } from '@/enums'

const categoryTranslations: Record<TransactionCategory, string> = {
  [TransactionCategory.Rent]: 'Chirie',
  [TransactionCategory.Utilities]: 'Utilități',
  [TransactionCategory.Subscriptions]: 'Abonamente',
  [TransactionCategory.Food]: 'Mâncare',
  [TransactionCategory.Entertainment]: 'Divertisment',
  [TransactionCategory.Transportation]: 'Transport',
  [TransactionCategory.Education]: 'Educație',
  [TransactionCategory.Other]: 'Altele',
}

export const useCategory = () => {
  const globalsStore = useGlobalsStore()

  const translateCategory = (category: string): string => {
    if (globalsStore.language === 'en') return category
    return categoryTranslations[category as TransactionCategory] ?? category
  }

  return { translateCategory }
}
