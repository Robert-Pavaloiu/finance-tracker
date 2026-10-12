import { ref, getCurrentScope, onScopeDispose } from 'vue'
import { useDate } from './useDate'
// Local date as YYYY-MM-DD. Don't use toISOString(): it's UTC, so you'd get
// the wrong day around midnight during British Summer Time.
export function toLocalISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function msUntilNextMidnight(now: Date = new Date()): number {
  // Date handles month/year overflow and DST for us
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  return next.getTime() - now.getTime()
}

export function useToday() {
  const { toLocalISODate } = useDate()
  const today = ref(toLocalISODate(new Date()))
  let timer: ReturnType<typeof setTimeout> | undefined

  function update() {
    today.value = toLocalISODate(new Date())
  }

  function schedule() {
    clearTimeout(timer)
    // +1s buffer so the timer never fires fractionally before midnight
    timer = setTimeout(() => {
      update()
      schedule()
    }, msUntilNextMidnight() + 1000)
  }

  // Timers are throttled or paused in background tabs and when a laptop
  // sleeps, so re-check whenever the tab becomes visible again.
  function onVisibilityChange() {
    if (document.visibilityState === 'visible') {
      update()
      schedule()
    }
  }

  schedule()
  document.addEventListener('visibilitychange', onVisibilityChange)

  if (getCurrentScope()) {
    onScopeDispose(() => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    })
  }

  return { today }
}
