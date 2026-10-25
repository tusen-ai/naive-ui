import type { ComputedRef, WritableComputedRef } from 'vue'
import { useOsTheme } from 'naive-ui'
import { computed, nextTick, ref, watchEffect } from 'vue'

export type ColorMode = 'light' | 'dark' | 'auto'

const MODES: ColorMode[] = ['light', 'dark', 'auto']

function isColorMode(value: string | null): value is ColorMode {
  return MODES.includes(value as ColorMode)
}

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  }
  catch {
    return null
  }
}

function writeStorage(key: string, value: string | null): void {
  try {
    if (value === null)
      localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  }
  catch {}
}

// Turn transitions off while the colors change, so the page switches in one
// step instead of every component fading on its own
async function withoutTransitions(change: () => void): Promise<void> {
  const style = document.createElement('style')
  style.textContent = '*,*::before,*::after{transition:none!important}'
  document.head.appendChild(style)
  change()
  await nextTick()
  // Force a style recalc before the transitions come back
  void getComputedStyle(document.body).opacity
  style.remove()
}

/**
 * The reader's color mode, in the manner of VueUse's `useColorMode`.
 * `mode` is what they picked (`light`, `dark` or `auto`, which follows the
 * OS); `state` is the theme in effect. Only an explicit pick is stored, it is
 * kept in step across tabs, and `color-scheme` on <html> follows `state`.
 * index.html applies the same rule before the first paint.
 */
export function useColorMode({ storageKey }: { storageKey: string }): {
  mode: WritableComputedRef<ColorMode>
  state: ComputedRef<'light' | 'dark'>
} {
  const read = (): ColorMode => {
    const value = readStorage(storageKey)
    return isColorMode(value) ? value : 'auto'
  }
  const storedRef = ref(read())
  const osThemeRef = useOsTheme()

  window.addEventListener('storage', (e) => {
    if (e.key === storageKey || e.key === null)
      withoutTransitions(() => (storedRef.value = read()))
  })

  const mode = computed<ColorMode>({
    get: () => storedRef.value,
    set: (value: ColorMode) => {
      writeStorage(storageKey, value === 'auto' ? null : value)
      withoutTransitions(() => (storedRef.value = value))
    }
  })
  const state = computed<'light' | 'dark'>(() =>
    storedRef.value === 'auto' ? (osThemeRef.value ?? 'light') : storedRef.value
  )

  watchEffect(() => {
    document.documentElement.style.colorScheme = state.value
  })

  return { mode, state }
}
