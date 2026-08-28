import { beforeEach, describe, expect, it } from 'vitest'
import {
  readThemePreference,
  setThemePreference,
  themeStorageKey,
  useThemePreference,
  writeThemePreference
} from './theme'

function createMemoryStorage() {
  const values = new Map()
  return {
    clear: () => values.clear(),
    getItem: key => values.get(key) ?? null,
    removeItem: key => values.delete(key),
    setItem: (key, value) => values.set(key, String(value))
  }
}

describe('theme preference', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createMemoryStorage()
    })
    setThemePreference('os-theme')
  })

  it('reads only explicit theme preferences', () => {
    window.localStorage.setItem(themeStorageKey, 'dark')
    expect(readThemePreference()).toBe('dark')

    window.localStorage.setItem(themeStorageKey, 'os-theme')
    expect(readThemePreference()).toBeNull()

    window.localStorage.setItem(themeStorageKey, 'invalid')
    expect(readThemePreference()).toBeNull()
  })

  it('uses a missing value to represent the OS theme', () => {
    writeThemePreference('light')
    expect(window.localStorage.getItem(themeStorageKey)).toBe('light')

    writeThemePreference('os-theme')
    expect(window.localStorage.getItem(themeStorageKey)).toBeNull()
  })

  it('keeps the reactive preference in sync', () => {
    setThemePreference('dark')
    expect(useThemePreference().value).toBe('dark')
    expect(window.localStorage.getItem(themeStorageKey)).toBe('dark')

    setThemePreference('os-theme')
    expect(useThemePreference().value).toBeNull()
    expect(window.localStorage.getItem(themeStorageKey)).toBeNull()
  })

  it('falls back safely when storage is unavailable', () => {
    const unavailableStorage = {
      getItem() {
        throw new Error('unavailable')
      },
      setItem() {
        throw new Error('unavailable')
      },
      removeItem() {
        throw new Error('unavailable')
      }
    }

    expect(readThemePreference(unavailableStorage)).toBeNull()
    expect(() => writeThemePreference('dark', unavailableStorage)).not.toThrow()

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('unavailable')
      }
    })
    expect(readThemePreference()).toBeNull()
    expect(() => writeThemePreference('dark')).not.toThrow()
  })
})
