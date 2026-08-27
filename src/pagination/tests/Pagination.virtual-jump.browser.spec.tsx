import { locators, page } from 'vitest/browser'
import { createApp, defineComponent, nextTick, ref } from 'vue'
import { NPagination } from '../index'

declare module 'vitest/browser' {
  interface LocatorSelectors {
    getByClass: (className: string) => import('vitest/browser').Locator
  }
}

locators.extend({
  getByClass(className: string) {
    return `.${className}`
  }
})

function collectPageItems(): HTMLElement[] {
  return Array.from(document.querySelectorAll('.n-pagination-item'))
}

function findFastJumpIndex(): number {
  const index = collectPageItems().findIndex((element, itemIndex, items) => {
    return (
      itemIndex > 0
      && itemIndex < items.length - 1
      && element.querySelector('.n-base-icon')
    )
  })
  if (index === -1)
    throw new Error('fast-jump pagination item not found')
  return index
}

async function mountPagination() {
  await page.viewport(900, 400)
  const host = document.createElement('div')
  document.body.append(host)

  const currentPage = ref(1)
  const errors: unknown[] = []
  const handleRejection = (event: PromiseRejectionEvent): void => {
    errors.push(event.reason)
  }
  const handleError = (event: ErrorEvent): void => {
    errors.push(event.error ?? event.message)
  }
  window.addEventListener('unhandledrejection', handleRejection)
  window.addEventListener('error', handleError)

  const App = defineComponent({
    setup() {
      return () => (
        <NPagination
          page={currentPage.value}
          pageCount={200}
          onUpdatePage={(pageNumber: number) => {
            currentPage.value = pageNumber
          }}
        />
      )
    }
  })

  const app = createApp(App)
  app.config.errorHandler = (error) => {
    errors.push(error)
  }
  app.mount(host)
  await nextTick()
  await expect.element(page.getByClass('n-pagination')).toBeVisible()

  return {
    currentPage,
    errors,
    unmount() {
      window.removeEventListener('unhandledrejection', handleRejection)
      window.removeEventListener('error', handleError)
      app.unmount()
      host.remove()
    }
  }
}

async function clickPage(label: string): Promise<void> {
  const item = collectPageItems().find(
    element => element.textContent?.trim() === label
  )
  if (!item)
    throw new Error(`pagination item "${label}" not found`)
  item.click()
  await nextTick()
}

async function hoverFastJumpAndWaitForVirtualMenu(): Promise<void> {
  await page.getByClass('n-pagination-item').nth(findFastJumpIndex()).hover()
  await expect.element(page.getByClass('n-virtual-list')).toBeVisible()
  await expect.element(page.getByClass('n-base-select-menu')).toBeVisible()
}

describe('n-pagination virtual jump (browser)', () => {
  it('should not throw when a virtualized fast-jump menu is open and jumping to page 1', async () => {
    const pagination = await mountPagination()
    try {
      await clickPage('200')
      expect(pagination.currentPage.value).toBe(200)

      await hoverFastJumpAndWaitForVirtualMenu()

      await clickPage('1')
      await nextTick()
      expect(pagination.currentPage.value).toBe(1)
      expect(pagination.errors).toEqual([])
    }
    finally {
      pagination.unmount()
    }
  })
})
