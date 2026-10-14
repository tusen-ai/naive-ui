import type { DataTableColumns } from '../index'
import { page } from 'vitest/browser'
import { createApp, defineComponent, h, nextTick, ref } from 'vue'
import { NDataTable } from '../index'

interface RowData {
  key: number
  name: string
}

const rows: RowData[] = [
  { key: 0, name: 'Edward King 0' },
  { key: 1, name: 'Edward King 1' }
]

function createColumns(count: number): DataTableColumns<RowData> {
  return Array.from({ length: count }, (_, index) => ({
    title: `Col ${index}`,
    key: `col${index}`,
    width: 200,
    ...(index === count - 1 ? { fixed: 'right' as const } : {})
  }))
}

function getRightShadow(colKey: string): string {
  const el = document.querySelector(`[data-col-key="${colKey}"]`)
  if (!el)
    return ''
  return getComputedStyle(el, '::before').boxShadow
}

async function mountTable(
  columns: DataTableColumns<RowData>,
  scrollX?: number | string
) {
  await page.viewport(800, 600)

  const host = document.createElement('div')
  host.style.width = '640px'
  document.body.append(host)

  const App = defineComponent({
    setup() {
      return () => (
        <NDataTable columns={columns} data={rows} scrollX={scrollX} />
      )
    }
  })

  const app = createApp(App)
  app.mount(host)

  await nextTick()
  await expect.element(page.getByText('Edward King 0')).toBeVisible()

  return {
    async getBody(): Promise<HTMLElement> {
      return (await page
        .getByClass('n-scrollbar-container')
        .findElement()) as HTMLElement
    },
    unmount() {
      app.unmount()
      host.remove()
    }
  }
}

describe('n-data-table right fixed shadow (browser)', () => {
  it('shows right fixed shadow when dynamic columns overflow without scroll-x', async () => {
    const columns = ref(createColumns(2))
    await page.viewport(800, 600)

    const host = document.createElement('div')
    host.style.width = '640px'
    document.body.append(host)

    const App = defineComponent({
      setup() {
        return () => <NDataTable columns={columns.value} data={rows} />
      }
    })

    const app = createApp(App)
    app.mount(host)

    try {
      await nextTick()
      await expect.element(page.getByText('Edward King 0')).toBeVisible()
      // No overflow yet, so there should be no shadow.
      expect(getRightShadow('col1')).toBe('none')

      columns.value = createColumns(8)
      await nextTick()

      const body = (await page
        .getByClass('n-scrollbar-container')
        .findElement()) as HTMLElement
      await expect
        .poll(() => body.scrollWidth - body.clientWidth)
        .toBeGreaterThan(100)

      // The last column is now fixed to the right and content overflows,
      // so the shadow must appear even though `scroll-x` is not set.
      await expect.poll(() => getRightShadow('col7')).not.toBe('none')
    }
    finally {
      app.unmount()
      host.remove()
    }
  })

  it('shows right fixed shadow when scroll-x is a percentage string', async () => {
    const table = await mountTable(createColumns(8), '100%')
    try {
      const body = await table.getBody()
      await expect
        .poll(() => body.scrollWidth - body.clientWidth)
        .toBeGreaterThan(100)
      await expect.poll(() => getRightShadow('col7')).not.toBe('none')
    }
    finally {
      table.unmount()
    }
  })
})
