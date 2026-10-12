const displayFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

// Local date as YYYY-MM-DD (toISOString() is UTC and can give the wrong day)
const toLocalISODate = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export const useDate = () => {
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''
    // Date-only strings parse as UTC, so pin them to local midnight.
    // Strings that already include a time are left alone.
    const date = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
      ? new Date(`${dateString}T00:00:00`)
      : new Date(dateString)
    if (Number.isNaN(date.getTime())) return ''
    return displayFormatter.format(date).replace(/\//g, '.')
  }

  return { formatDate, toLocalISODate }
}
