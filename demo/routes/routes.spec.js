import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { themeStorageKey } from '../store/theme'
import { legacyThemeRoute } from './routes'

function createMemoryStorage() {
  const values = new Map()
  return {
    clear: () => values.clear(),
    getItem: key => values.get(key) ?? null,
    removeItem: key => values.delete(key),
    setItem: (key, value) => values.set(key, String(value))
  }
}

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      legacyThemeRoute,
      {
        path: '/:pathMatch(.*)*',
        component: { template: '<div />' }
      }
    ]
  })
}

describe('legacy theme route', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createMemoryStorage()
    })
  })

  it('migrates an explicit theme and preserves the full destination', async () => {
    const router = createTestRouter()

    await router.push('/en-US/dark/components/button?source=legacy#examples')
    await router.isReady()

    expect(router.currentRoute.value.fullPath).toBe(
      '/en-US/components/button?source=legacy#examples'
    )
    expect(window.localStorage.getItem(themeStorageKey)).toBe('dark')
  })

  it('uses a missing preference for an OS-theme URL', async () => {
    window.localStorage.setItem(themeStorageKey, 'light')
    const router = createTestRouter()

    await router.push('/zh-CN/os-theme/docs/introduction')
    await router.isReady()

    expect(router.currentRoute.value.fullPath).toBe('/zh-CN/docs/introduction')
    expect(window.localStorage.getItem(themeStorageKey)).toBeNull()
  })

  it('redirects a legacy locale home without adding a trailing slash', async () => {
    const router = createTestRouter()

    await router.push('/en-US/light')
    await router.isReady()

    expect(router.currentRoute.value.fullPath).toBe('/en-US')
    expect(window.localStorage.getItem(themeStorageKey)).toBe('light')
  })
})
