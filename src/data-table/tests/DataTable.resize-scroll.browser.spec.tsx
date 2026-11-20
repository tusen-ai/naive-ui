import type { DataTableColumns } from '../index'
import { page } from 'vitest/browser'
import { createApp, nextTick } from 'vue'
import { NDataTable } from '../index'

interface RowData {
  key: number
  name: string
}

const columns: DataTableColumns<RowData> = [
  { title: 'Name', key: 'name', width: 200, resizable: true },
  { title: 'Row', key: 'row', resizable: true },
  { title: 'Row1', key: 'row1', width: 100, resizable: true }
]

const rows: RowData[] = Array.from({ length: 10 }, (_, index) => ({
  key: index,
  name: `Edward King ${index}`
}))

describe('n-data-table resizable columns (browser)', () => {
  it('can scroll horizontally once resized columns exceed scroll-x', async () => {
    await page.viewport(800, 600)
    const host = document.createElement('div')
    host.style.width = '600px'
    document.body.append(host)
    const app = createApp(() => (
      <NDataTable columns={columns} data={rows} maxHeight={250} scrollX={400} />
    ))
    app.mount(host)
    try {
      await nextTick()
      await expect.element(page.getByText('Edward King 0')).toBeVisible()
      const rail = host.querySelector(
        '.n-data-table-base-table-body .n-scrollbar-rail--horizontal'
      ) as HTMLElement
      const body = host.querySelector(
        '.n-data-table-base-table-body .n-scrollbar-container'
      ) as HTMLElement
      expect(body.scrollWidth).toBe(body.clientWidth)

      // widen "Row" so the columns are wider than the container
      const handle = host.querySelectorAll(
        '.n-data-table-resize-button'
      )[1] as HTMLElement
      const { x, y, width, height } = handle.getBoundingClientRect()
      const startX = x + width / 2
      const startY = y + height / 2
      const mouse = (type: string, clientX: number): MouseEvent =>
        new MouseEvent(type, { bubbles: true, clientX, clientY: startY })
      handle.dispatchEvent(mouse('mousedown', startX))
      window.dispatchEvent(mouse('mousemove', startX + 400))
      window.dispatchEvent(mouse('mouseup', startX + 400))

      await expect
        .poll(() => body.scrollWidth - body.clientWidth)
        .toBeGreaterThan(300)
      await expect
        .poll(() => rail.classList.contains('n-scrollbar-rail--disabled'))
        .toBe(false)
    }
    finally {
      app.unmount()
      host.remove()
    }
  })
})
