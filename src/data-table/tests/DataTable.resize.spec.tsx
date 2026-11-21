import type { VueWrapper } from '@vue/test-utils'
import type { DataTableColumns } from '../index'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NDataTable } from '../index'

function createColumns(): DataTableColumns {
  return Array.from({ length: 12 }, (_, key) => ({
    title: `Col ${key}`,
    key,
    width: 100,
    resizable: true,
    fixed: key < 2 ? 'left' : key > 9 ? 'right' : undefined,
    render: (_row, index) => `${key}-${index}`
  }))
}

async function resize(
  wrapper: VueWrapper,
  key: number,
  initialWidth: number,
  displacement: number
): Promise<void> {
  const header = wrapper.get(`th[data-col-key="${key}"]`)
  // jsdom has no layout; only supply the width read at pointer-down.
  const measure = vi
    .spyOn(header.element, 'getBoundingClientRect')
    .mockReturnValue(new DOMRect(0, 0, initialWidth, 48))
  await header
    .get('[data-data-table-resizable]')
    .trigger('mousedown', { clientX: 0 })
  window.dispatchEvent(new MouseEvent('mousemove', { clientX: displacement }))
  window.dispatchEvent(new MouseEvent('mouseup'))
  await nextTick()
  measure.mockRestore()
}

describe('n-data-table resized column layout', () => {
  it('updates both fixed edges after growing and shrinking columns', async () => {
    const columns = createColumns()
    const onResize = vi.fn()
    const wrapper = mount(NDataTable, {
      props: {
        columns,
        data: [{ key: 0 }],
        maxHeight: 250,
        scrollX: 1200,
        onUnstableColumnResize: onResize
      }
    })
    try {
      await resize(wrapper, 0, 100, 70)
      expect(onResize).toHaveBeenCalledTimes(1)
      for (const tag of ['th', 'td']) {
        expect(
          wrapper.get(`${tag}[data-col-key="1"]`).attributes('style')
        ).toContain('left: 170px')
      }
      await resize(wrapper, 0, 170, -90)
      for (const tag of ['th', 'td']) {
        expect(
          wrapper.get(`${tag}[data-col-key="1"]`).attributes('style')
        ).toContain('left: 80px')
      }
      await resize(wrapper, 11, 100, 40)
      for (const tag of ['th', 'td']) {
        expect(
          wrapper.get(`${tag}[data-col-key="10"]`).attributes('style')
        ).toContain('right: 140px')
      }
      expect(columns[0].width).toBe(100)
      expect(columns[11].width).toBe(100)
    }
    finally {
      wrapper.unmount()
    }
  })
})
