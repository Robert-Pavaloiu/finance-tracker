import { useGlobalsStore } from '@/stores/globals-store'

export const useCurrency = () => {
  const globalsStore = useGlobalsStore()
  const formatAmount = (amount: number) => {
    if (globalsStore.currency === 'pound') return `£${amount}`
    if (globalsStore.currency === 'euro') return `€${amount}`
    return `${amount} lei`
  }
  return { formatAmount }
}
