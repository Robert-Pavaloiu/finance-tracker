import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGlobalsStore } from '../stores/globals-store'

describe('globals store - recurring date logic', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with today as recurringDay and computes a valid recurringDate', () => {
    const store = useGlobalsStore()
    const today = new Date()
    expect(store.monthlyEarnings.recurringDay).toBe(today.getDate())
    const computed = new Date(store.monthlyEarnings.recurringDate)
    expect(computed.getDate()).toBeLessThanOrEqual(
      new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
    )
  })

  it('setRecurringDay clamps the date to the maximum days of the current month', () => {
    const store = useGlobalsStore()
    store.setRecurringDay(31)
    const now = new Date()
    const maxDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const actual = new Date(store.monthlyEarnings.recurringDate).getDate()
    expect(actual).toBe(maxDay)
  })

  it('getRecurringDateForMonth can calculate for arbitrary months and respects month lengths', () => {
    const store = useGlobalsStore()
    store.setRecurringDay(31)
    // february non-leap year
    const feb2025 = store.getRecurringDateForMonth(2025, 1)
    expect(new Date(feb2025).getDate()).toBe(28)
    // april has 30 days
    const april2026 = store.getRecurringDateForMonth(2026, 3)
    expect(new Date(april2026).getDate()).toBe(30)
  })
})
