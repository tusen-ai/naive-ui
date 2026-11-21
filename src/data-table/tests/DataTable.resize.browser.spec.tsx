import type { DataTableColumns, DataTableInst } from '../index'
import { page } from 'vitest/browser'
import { createApp, h, nextTick, ref } from 'vue'
import { NDataTable } from '../index'

async function mountTable(
  columnCount = 20,
  rowCount = 100,
  fixedSides: 'both' | 'left' | 'right' | 'none' = 'both'
) {
  await page.viewport(1000, 700)
  const host = document.createElement('div')
  host.style.width = '720px'
  document.body.append(host)
  const table = ref<DataTableInst>()
  let cellClicks = 0
  const columns: DataTableColumns = Array.from(
    { length: columnCount },
    (_, key) => ({
      title: `Col ${key}`,
      key,
      width: 100,
      minWidth: 60,
      maxWidth: 240,
      resizable: true,
      fixed:
        key < 2 && (fixedSides === 'both' || fixedSides === 'left')
          ? 'left'
          : key >= columnCount - 2
            && (fixedSides === 'both' || fixedSides === 'right')
            ? 'right'
            : undefined,
      cellProps: () => ({
        onClick: () => {
          cellClicks++
        }
      }),
      render: (_row, index) => `${key}-${index}`
    })
  )
  let resizeCalls = 0
  const app = createApp(() =>
    h(NDataTable, {
      ref: table,
      columns,
      data: Array.from({ length: rowCount }, (_, key) => ({ key })),
      maxHeight: 250,
      scrollX: columnCount * 100,
      virtualScroll: true,
      virtualScrollX: true,
      virtualScrollHeader: true,
      headerHeight: 48,
      minRowHeight: 48,
      heightForRow: () => 48,
      onUnstableColumnResize: () => {
        resizeCalls++
      }
    })
  )
  app.mount(host)
  function cell(key: number, header = true): HTMLElement {
    const element = host.querySelector<HTMLElement>(
      `${header ? '.n-data-table-thead' : '.n-data-table-tbody'} [data-col-key="${key}"]`
    )
    if (!element)
      throw new Error(`Missing ${header ? 'header' : 'body'} cell ${key}`)
    return element
  }
  await expect.poll(() => cell(0).getBoundingClientRect().width).toBe(100)
  return {
    cell,
    columns,
    async clickCell(key: number) {
      const before = cellClicks
      await page.getByText(`${key}-0`, { exact: true }).click()
      expect(cellClicks).toBe(before + 1)
    },
    async resize(key: number, displacement: number) {
      const handle = cell(key).querySelector('[data-data-table-resizable]')!
      const start = handle.getBoundingClientRect().x + 4
      const previousCalls = resizeCalls
      handle.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: start })
      )
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: start + displacement })
      )
      window.dispatchEvent(new MouseEvent('mouseup'))
      await nextTick()
      expect(resizeCalls).toBe(previousCalls + 1)
    },
    async scroll(left: number, top = 0) {
      table.value!.scrollTo({ left, top })
      await nextTick()
      const body = host.querySelector<HTMLElement>(
        '.n-data-table-base-table-body .v-vl'
      )!
      const header = host.querySelector<HTMLElement>(
        '.n-data-table-base-table-header'
      )!
      const targetLeft = Math.min(left, body.scrollWidth - body.clientWidth)
      await expect.poll(() => body.scrollLeft).toBe(targetLeft)
      await expect.poll(() => header.scrollLeft).toBe(targetLeft)
      await expect.poll(() => body.scrollTop).toBe(top)
    },
    async scrollHeader(left: number) {
      const header = host.querySelector<HTMLElement>(
        '.n-data-table-base-table-header'
      )!
      const body = host.querySelector<HTMLElement>(
        '.n-data-table-base-table-body .v-vl'
      )!
      header.scrollTo({ left })
      await expect.poll(() => header.scrollLeft).toBe(left)
      await expect.poll(() => body.scrollLeft).toBe(left)
    },
    async expectAligned(key: number) {
      await expect
        .poll(
          () =>
            cell(key).getBoundingClientRect().left
            - cell(key, false).getBoundingClientRect().left
        )
        .toBeCloseTo(0)
      await expect
        .poll(
          () =>
            cell(key).getBoundingClientRect().width
            - cell(key, false).getBoundingClientRect().width
        )
        .toBeCloseTo(0)
    },
    unmount() {
      app.unmount()
      host.remove()
    }
  }
}

describe('n-data-table resizable virtual columns (browser)', () => {
  it('keeps both fixed edges aligned through repeated resize and scrolling', async () => {
    const table = await mountTable()
    try {
      await table.resize(0, 70)
      await table.scroll(500)
      await expect.poll(() => table.cell(7, false).textContent).toBe('7-0')
      await table.expectAligned(7)
      for (const header of [true, false]) {
        await expect
          .poll(
            () =>
              table.cell(1, header).getBoundingClientRect().left
              - table.cell(0, header).getBoundingClientRect().right
          )
          .toBeCloseTo(0)
      }
      await table.resize(1, 30)
      await table.resize(0, -90)
      await table.resize(19, 40)
      await table.resize(18, -20)
      for (const header of [true, false]) {
        await expect
          .poll(
            () =>
              table.cell(1, header).getBoundingClientRect().left
              - table.cell(0, header).getBoundingClientRect().right
          )
          .toBeCloseTo(0)
        await expect
          .poll(
            () =>
              table.cell(19, header).getBoundingClientRect().left
              - table.cell(18, header).getBoundingClientRect().right
          )
          .toBeCloseTo(0)
      }
      await table.scroll(1000, 2400)
      await expect.poll(() => table.cell(0, false).textContent).toContain('-49')
      await expect
        .poll(() => table.cell(19, false).textContent)
        .toContain('-49')
      for (const key of [0, 1, 13, 18, 19]) {
        await table.expectAligned(key)
      }
      await table.resize(0, -100)
      await table.resize(19, 200)
      for (const header of [true, false]) {
        expect(table.cell(0, header).getBoundingClientRect().width).toBe(60)
        expect(table.cell(19, header).getBoundingClientRect().width).toBe(240)
        expect(
          table.cell(1, header).getBoundingClientRect().left
          - table.cell(0, header).getBoundingClientRect().right
        ).toBeCloseTo(0)
        expect(
          table.cell(19, header).getBoundingClientRect().left
          - table.cell(18, header).getBoundingClientRect().right
        ).toBeCloseTo(0)
      }
      expect(table.columns[0].width).toBe(100)
      expect(table.columns[19].width).toBe(100)
    }
    finally {
      table.unmount()
    }
  })

  it('updates virtual positions and the width of a resized middle column', async () => {
    const table = await mountTable()
    try {
      await table.resize(0, 70)
      for (const header of [true, false]) {
        await expect
          .poll(
            () =>
              table.cell(2, header).getBoundingClientRect().left
              - table.cell(1, header).getBoundingClientRect().right
          )
          .toBeCloseTo(0)
      }
      await table.resize(2, 40)
      for (const header of [true, false]) {
        await expect
          .poll(() => table.cell(2, header).getBoundingClientRect().width)
          .toBe(140)
        await expect
          .poll(
            () =>
              table.cell(3, header).getBoundingClientRect().left
              - table.cell(2, header).getBoundingClientRect().right
          )
          .toBeCloseTo(0)
      }
      await table.scroll(900)
      await expect.poll(() => table.cell(12, false).textContent).toBe('12-0')
      await table.expectAligned(12)
      await table.scroll(0)
      await expect
        .poll(() => table.cell(2, false).getBoundingClientRect().width)
        .toBe(140)
      expect(table.cell(2, false).textContent).toBe('2-0')
    }
    finally {
      table.unmount()
    }
  })

  it('keeps the original large-table workflow usable when columns shrink first', async () => {
    const table = await mountTable(1000, 1000)
    try {
      await table.resize(0, -30)
      await table.resize(999, -20)
      await table.scroll(500)
      for (const header of [true, false]) {
        expect(table.cell(0, header).getBoundingClientRect().width).toBe(70)
        expect(table.cell(1, header).getBoundingClientRect().width).toBe(100)
        expect(table.cell(998, header).getBoundingClientRect().width).toBe(100)
        expect(table.cell(999, header).getBoundingClientRect().width).toBe(80)
        expect(
          table.cell(1, header).getBoundingClientRect().left
          - table.cell(0, header).getBoundingClientRect().right
        ).toBeCloseTo(0)
        expect(
          table.cell(999, header).getBoundingClientRect().left
          - table.cell(998, header).getBoundingClientRect().right
        ).toBeCloseTo(0)
      }
      await expect.poll(() => table.cell(7, false).textContent).toBe('7-0')
      for (const key of [0, 1, 7, 998, 999]) {
        await table.expectAligned(key)
      }
      const idleColor = getComputedStyle(table.cell(7, false)).backgroundColor
      await table.clickCell(7)
      await expect
        .poll(() => getComputedStyle(table.cell(7, false)).backgroundColor)
        .not
        .toBe(idleColor)
      await expect
        .poll(() => getComputedStyle(table.cell(7, false)).backgroundColor)
        .toBe(getComputedStyle(table.cell(0, false)).backgroundColor)
      await table.resize(1, 40)
      await table.resize(998, 30)
      await table.resize(7, 50)
      await table.scroll(100000, 24000)
      await expect
        .poll(() => table.cell(997, false).textContent)
        .toBe('997-499')
      for (const key of [0, 1, 997, 998, 999]) {
        await table.expectAligned(key)
      }
      await table.scroll(500)
      await expect.poll(() => table.cell(7, false).textContent).toBe('7-0')
      expect(table.cell(7, false).getBoundingClientRect().width).toBe(150)
      await table.expectAligned(7)
      expect(table.columns.every(column => column.width === 100)).toBe(true)
    }
    finally {
      table.unmount()
    }
  })

  it('synchronizes a new header scroll after a width-only update', async () => {
    const table = await mountTable()
    try {
      await table.resize(0, 30)
      await table.scrollHeader(500)
      await table.expectAligned(7)
      await table.resize(19, 20)
      await table.scrollHeader(0)
      await table.expectAligned(0)
    }
    finally {
      table.unmount()
    }
  })

  it.each(['left', 'right', 'none'] as const)(
    'preserves virtual column widths with %s fixed columns',
    async (fixedSides) => {
      const table = await mountTable(20, 100, fixedSides)
      try {
        await table.resize(0, -30)
        await table.scroll(2000)
        await table.resize(19, -20)
        for (const header of [true, false]) {
          expect(table.cell(18, header).getBoundingClientRect().width).toBe(100)
          expect(table.cell(19, header).getBoundingClientRect().width).toBe(80)
        }
        await table.expectAligned(18)
        await table.expectAligned(19)
        await table.scroll(0)
        for (const header of [true, false]) {
          expect(table.cell(0, header).getBoundingClientRect().width).toBe(70)
          expect(table.cell(1, header).getBoundingClientRect().width).toBe(100)
          expect(
            table.cell(2, header).getBoundingClientRect().left
            - table.cell(1, header).getBoundingClientRect().right
          ).toBeCloseTo(0)
        }
        await table.expectAligned(0)
        await table.expectAligned(2)
      }
      finally {
        table.unmount()
      }
    }
  )
})
