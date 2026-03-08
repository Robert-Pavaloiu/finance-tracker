import type { SavingsState } from '@/types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSavingsStore: () => SavingsState = defineStore(
  'savings',
  () => {
    const target = ref<number>(0)
    const targetDate = ref<string>('')
    const startingAmount = ref<number>(0)
    const contributions = ref<{ date: string; amount: number }[]>([])
    const totalContributed = computed(() => {
      return contributions.value.reduce((sum, c) => sum + c.amount, 0)
    })
    const totalSaved = computed(() => startingAmount.value + totalContributed.value)
    const remainingAmount = computed(() => Math.max(0, target.value - totalSaved.value))
    const monthsRemaining = computed(() => {
      const now = new Date()
      const targetD = new Date(targetDate.value)
      const years = targetD.getFullYear() - now.getFullYear()
      const months = targetD.getMonth() - now.getMonth()
      return Math.max(0, years * 12 + months)
    })
    const requiredMonthlyContribution = computed(() => {
      if (monthsRemaining.value === 0) return remainingAmount.value
      return remainingAmount.value / monthsRemaining.value
    })
    const getTotalUpToContributionIndex = (index: number) => {
      return contributions.value.slice(0, index + 1).reduce((sum, c) => sum + c.amount, 0)
    }

    const getRemainingByIndex = (index: number) => {
      return target.value - getTotalUpToContributionIndex(index) - startingAmount.value
    }

    const getRequiredMonthlyContributionByDate = (index: number, date: string) => {
      const targetD = new Date(targetDate.value)
      const contributionDate = new Date(date) // ← use the actual contribution date

      const years = targetD.getFullYear() - contributionDate.getFullYear()
      const months = targetD.getMonth() - contributionDate.getMonth()
      const monthsRemaining = Math.max(0, years * 12 + months)

      if (monthsRemaining === 0) return getRemainingByIndex(index)
      return Math.round(getRemainingByIndex(index) / monthsRemaining)
    }

    function editContribution(index: number, updates: Partial<{ date: string; amount: number }>) {
      if (contributions.value[index]) {
        contributions.value[index] = {
          ...contributions.value[index],
          ...updates,
        }
      }
    }

    return {
      target,
      targetDate,
      startingAmount,
      contributions,
      totalSaved,
      remainingAmount,
      monthsRemaining,
      requiredMonthlyContribution,
      getTotalUpToContributionIndex,
      getRequiredMonthlyContributionByDate,
      getRemainingByIndex,
      editContribution,
    }
  },
  {
    persist: true,
  },
)
