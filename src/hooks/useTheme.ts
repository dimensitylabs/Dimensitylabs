'use client'

import { useState, useCallback, useSyncExternalStore } from 'react'
import { type Theme, getInitialTheme, setTheme as applyTheme } from '@/lib/theme'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getSnapshot(): boolean {
  return true
}

function getServerSnapshot(): boolean {
  return false
}

export function useTheme() {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const initial = getInitialTheme()
    applyTheme(initial)
    return initial
  })

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light'
      applyTheme(next)
      return next
    })
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
  }, [])

  return { theme, toggleTheme, setTheme, mounted }
}
