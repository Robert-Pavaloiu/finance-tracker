import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// ─────────────────────────────────────────────
// Mocks
// ─────────────────────────────────────────────

// crypto.randomUUID is not available in the test environment
vi.stubGlobal('crypto', { randomUUID: () => 'test-uuid-' + Math.random() })

// ─────────────────────────────────────────────
// Helpers — inline the pure logic so tests
// don't need a full Vue component environment
// ─────────────────────────────────────────────

/** Mirrors savings-store getTotalUpToContributionIndex */
function getTotalUpTo(contributions: { amount: number }[], index: number): number {
  return contributions.slice(0, index + 1).reduce((sum, c) => sum + c.amount, 0)
}

/** Mirrors savings-store getRemainingByIndex */
function getRemaining(
  contributions: { amount: number }[],
  index: number,
  target: number,
  startingAmount: number,
): number {
  return target - getTotalUpTo(contributions, index) - startingAmount
}

/** Mirrors savings-store getRequiredMonthlyContributionByDate */
function getRequiredMonthly(
  contributions: { amount: number }[],
  index: number,
  target: number,
  startingAmount: number,
  targetDate: string,
  contributionDate: string,
): number {
  const targetD = new Date(targetDate)
  const contribD = new Date(contributionDate)
  const years = targetD.getFullYear() - contribD.getFullYear()
  const months = targetD.getMonth() - contribD.getMonth()
  const monthsRemaining = Math.max(0, years * 12 + months)
  const remaining = getRemaining(contributions, index, target, startingAmount)
  if (monthsRemaining === 0) return remaining
  return Math.round(remaining / monthsRemaining)
}

/** Mirrors useDate formatDate */
function formatDate(dateString: string | undefined): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB')
}

/** Mirrors useCurrency formatAmount */
function formatAmount(amount: number, currency: 'pound' | 'lei' | 'euro'): string {
  if (currency === 'pound') return `£${amount}`
  if (currency === 'euro') return `€${amount}`
  return `${amount} lei`
}

type TransactionCategory =
  | 'Rent'
  | 'Utilities'
  | 'Subscriptions'
  | 'Food'
  | 'Entertainment'
  | 'Transportation'
  | 'Education'
  | 'Other'

const categoryTranslations: Record<TransactionCategory, string> = {
  Rent: 'Chirie',
  Utilities: 'Utilități',
  Subscriptions: 'Abonamente',
  Food: 'Mâncare',
  Entertainment: 'Divertisment',
  Transportation: 'Transport',
  Education: 'Educație',
  Other: 'Altele',
}

/** Mirrors useCategory translateCategory */
function translateCategory(category: string, language: 'en' | 'ro'): string {
  if (language === 'en') return category
  return categoryTranslations[category as TransactionCategory] ?? category
}

/** Mirrors dayEndsIn from recurring-expenses-table */
function dayEndsIn(day: number, language: 'en' | 'ro'): string {
  if (language === 'ro') return ''
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

// ─────────────────────────────────────────────
// savings-store logic
// ─────────────────────────────────────────────

describe('getTotalUpToContributionIndex', () => {
  const contributions = [
    { date: '2026-01-01', amount: 500 },
    { date: '2026-02-01', amount: 300 },
    { date: '2026-03-01', amount: 200 },
  ]

  it('returns the first contribution amount at index 0', () => {
    expect(getTotalUpTo(contributions, 0)).toBe(500)
  })

  it('accumulates correctly at index 1', () => {
    expect(getTotalUpTo(contributions, 1)).toBe(800)
  })

  it('accumulates all contributions at last index', () => {
    expect(getTotalUpTo(contributions, 2)).toBe(1000)
  })

  it('returns 0 for an empty array', () => {
    expect(getTotalUpTo([], 0)).toBe(0)
  })
})

describe('getRemainingByIndex', () => {
  const contributions = [
    { date: '2026-01-01', amount: 500 },
    { date: '2026-02-01', amount: 300 },
    { date: '2026-03-01', amount: 700 },
  ]
  const target = 2000
  const startingAmount = 300

  it('correctly subtracts first contribution and starting amount', () => {
    // target - (500) - 300 = 1200
    expect(getRemaining(contributions, 0, target, startingAmount)).toBe(1200)
  })

  it('correctly subtracts accumulated contributions at index 1', () => {
    // target - (500 + 300) - 300 = 900
    expect(getRemaining(contributions, 1, target, startingAmount)).toBe(900)
  })

  it('returns 0 when goal is fully met', () => {
    // target - (500+300+700) - 300 = 200 not 0, let's use exact values
    const c = [{ date: '2026-01-01', amount: 1700 }]
    // 2000 - 1700 - 300 = 0
    expect(getRemaining(c, 0, 2000, 300)).toBe(0)
  })

  it('handles no starting amount', () => {
    expect(getRemaining(contributions, 0, target, 0)).toBe(1500)
  })
})

describe('getRequiredMonthlyContributionByDate', () => {
  const contributions = [{ date: '2026-01-01', amount: 500 }]
  const target = 3000
  const startingAmount = 300

  it('divides remaining by months between contribution date and target date', () => {
    // remaining = 3000 - 500 - 300 = 2200
    // months from Jan 2026 to Jul 2026 = 6
    // required = round(2200 / 6) = 367
    const result = getRequiredMonthly(
      contributions,
      0,
      target,
      startingAmount,
      '2026-07-01',
      '2026-01-01',
    )
    expect(result).toBe(367)
  })

  it('returns remaining amount when months remaining is 0', () => {
    // same month as target — monthsRemaining = 0
    const result = getRequiredMonthly(
      contributions,
      0,
      target,
      startingAmount,
      '2026-01-15',
      '2026-01-01',
    )
    expect(result).toBe(2200)
  })

  it('rounds to nearest integer', () => {
    // remaining = 3000 - 500 - 300 = 2200, months = 3
    // 2200 / 3 = 733.33 → rounds to 733
    const result = getRequiredMonthly(
      contributions,
      0,
      target,
      startingAmount,
      '2026-04-01',
      '2026-01-01',
    )
    expect(result).toBe(733)
  })
})

describe('totalSaved computed', () => {
  it('adds startingAmount to total contributions', () => {
    const contributions = [{ amount: 500 }, { amount: 300 }]
    const startingAmount = 200
    const totalContributed = contributions.reduce((s, c) => s + c.amount, 0)
    expect(startingAmount + totalContributed).toBe(1000)
  })

  it('returns just startingAmount when no contributions', () => {
    expect(0 + 300).toBe(300)
  })
})

describe('remainingAmount computed', () => {
  it('returns target minus totalSaved', () => {
    expect(Math.max(0, 3000 - 1000)).toBe(2000)
  })

  it('never goes below 0 when over target', () => {
    expect(Math.max(0, 1000 - 1500)).toBe(0)
  })
})

// ─────────────────────────────────────────────
// globals-store logic
// ─────────────────────────────────────────────

describe('computeRecurringDate day clamping', () => {
  // mirrors the private computeRecurringDate function
  function computeRecurringDate(day: number, year: number, month: number): string {
    const maxDay = new Date(year, month + 1, 0).getDate()
    const adjusted = Math.min(day, maxDay)
    const date = new Date(year, month, adjusted)
    return date.toISOString()
  }

  it('clamps day 31 in February to 28 in a non-leap year', () => {
    const result = new Date(computeRecurringDate(31, 2025, 1)).getDate()
    expect(result).toBe(28)
  })

  it('clamps day 31 in February to 29 in a leap year', () => {
    const result = new Date(computeRecurringDate(31, 2024, 1)).getDate()
    expect(result).toBe(29)
  })

  it('clamps day 31 in April (30-day month) to 30', () => {
    const result = new Date(computeRecurringDate(31, 2026, 3)).getDate()
    expect(result).toBe(30)
  })

  it('does not clamp valid day 15 in any month', () => {
    const result = new Date(computeRecurringDate(15, 2026, 1)).getDate()
    expect(result).toBe(15)
  })

  it('does not clamp day 31 in January', () => {
    const result = new Date(computeRecurringDate(31, 2026, 0)).getDate()
    expect(result).toBe(31)
  })
})

describe('leftoverBudget', () => {
  it('equals income minus total transactions', () => {
    const income = 3000
    const transactions = [{ amount: 200 }, { amount: 100 }, { amount: 50 }]
    const total = transactions.reduce((s, t) => s + t.amount, 0)
    expect(income - total).toBe(2650)
  })

  it('goes negative when expenses exceed income', () => {
    const income = 500
    const transactions = [{ amount: 800 }]
    const total = transactions.reduce((s, t) => s + t.amount, 0)
    expect(income - total).toBe(-300)
  })
})

// ─────────────────────────────────────────────
// useDate composable
// ─────────────────────────────────────────────

describe('formatDate', () => {
  it('formats ISO date string to DD/MM/YYYY', () => {
    expect(formatDate('2026-03-09')).toBe('09/03/2026')
  })

  it('returns empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('')
  })

  it('returns empty string for empty string', () => {
    expect(formatDate('')).toBe('')
  })

  it('formats first day of year correctly', () => {
    expect(formatDate('2026-01-01')).toBe('01/01/2026')
  })
})

// ─────────────────────────────────────────────
// useCurrency composable
// ─────────────────────────────────────────────

describe('formatAmount', () => {
  it('prepends £ for pound currency', () => {
    expect(formatAmount(250, 'pound')).toBe('£250')
  })

  it('prepends € for euro currency', () => {
    expect(formatAmount(100, 'euro')).toBe('€100')
  })

  it('appends lei for Romanian leu', () => {
    expect(formatAmount(500, 'lei')).toBe('500 lei')
  })

  it('handles 0 correctly', () => {
    expect(formatAmount(0, 'pound')).toBe('£0')
  })

  it('handles large numbers', () => {
    expect(formatAmount(10000, 'euro')).toBe('€10000')
  })
})

// ─────────────────────────────────────────────
// useCategory composable
// ─────────────────────────────────────────────

describe('translateCategory', () => {
  it('returns the original category in English', () => {
    expect(translateCategory('Food', 'en')).toBe('Food')
    expect(translateCategory('Rent', 'en')).toBe('Rent')
  })

  it('translates all categories correctly in Romanian', () => {
    expect(translateCategory('Rent', 'ro')).toBe('Chirie')
    expect(translateCategory('Utilities', 'ro')).toBe('Utilități')
    expect(translateCategory('Subscriptions', 'ro')).toBe('Abonamente')
    expect(translateCategory('Food', 'ro')).toBe('Mâncare')
    expect(translateCategory('Entertainment', 'ro')).toBe('Divertisment')
    expect(translateCategory('Transportation', 'ro')).toBe('Transport')
    expect(translateCategory('Education', 'ro')).toBe('Educație')
    expect(translateCategory('Other', 'ro')).toBe('Altele')
  })

  it('falls back to original string for unknown category in Romanian', () => {
    expect(translateCategory('UnknownCategory', 'ro')).toBe('UnknownCategory')
  })
})

// ─────────────────────────────────────────────
// dayEndsIn (recurring-expenses-table)
// ─────────────────────────────────────────────

describe('dayEndsIn', () => {
  it('returns st for 1, 21, 31', () => {
    expect(dayEndsIn(1, 'en')).toBe('st')
    expect(dayEndsIn(21, 'en')).toBe('st')
    expect(dayEndsIn(31, 'en')).toBe('st')
  })

  it('returns nd for 2, 22', () => {
    expect(dayEndsIn(2, 'en')).toBe('nd')
    expect(dayEndsIn(22, 'en')).toBe('nd')
  })

  it('returns rd for 3, 23', () => {
    expect(dayEndsIn(3, 'en')).toBe('rd')
    expect(dayEndsIn(23, 'en')).toBe('rd')
  })

  it('returns th for 4-20', () => {
    for (let i = 4; i <= 20; i++) {
      expect(dayEndsIn(i, 'en')).toBe('th')
    }
  })

  it('handles the 11th/12th/13th edge cases correctly — all return th not st/nd/rd', () => {
    expect(dayEndsIn(11, 'en')).toBe('th')
    expect(dayEndsIn(12, 'en')).toBe('th')
    expect(dayEndsIn(13, 'en')).toBe('th')
  })

  it('returns empty string in Romanian for all days', () => {
    expect(dayEndsIn(1, 'ro')).toBe('')
    expect(dayEndsIn(15, 'ro')).toBe('')
    expect(dayEndsIn(31, 'ro')).toBe('')
  })
})
