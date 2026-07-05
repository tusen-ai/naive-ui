import type { VueWrapper } from '@vue/test-utils'
import type { DataTableInst, DataTableScrollTo } from '../index'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { NDataTable } from '../index'

interface RowData {
  name: string
}

function exerciseDataTableScrollTo(scrollTo: DataTableScrollTo): void {
  scrollTo(0, 100)
  scrollTo({ top: 100, debounce: false })
  scrollTo({ left: 0, top: 100, debounce: false })
  scrollTo({ position: 'top', debounce: false })
  scrollTo({ position: 'bottom', debounce: false })
  scrollTo({ index: 10, debounce: false })
  scrollTo({ key: 'row-10', debounce: false })
  scrollTo({ index: 10, elSize: 28, debounce: false })
  scrollTo({ el: document.createElement('div'), debounce: false })
}

describe('n-data-table scrollTo', () => {
  const columns = [{ title: 'Name', key: 'name' }]
  const rowCount = 100
  const minRowHeight = 28
  const maxHeight = 200
  const createData = (): RowData[] =>
    Array.from({ length: rowCount }, (_, i) => ({ name: `row-${i}` }))
  const rowKey = (row: RowData): string => row.name

  function mockScrollable(el: HTMLElement): void {
    Object.defineProperty(el, 'offsetHeight', {
      configurable: true,
      value: maxHeight
    })
    Object.defineProperty(el, 'scrollHeight', {
      configurable: true,
      value: rowCount * minRowHeight
    })
    Object.defineProperty(el, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 0
    })
  }

  async function createTable(virtualScroll: boolean): Promise<{
    wrapper: VueWrapper
    tableRef: { value: DataTableInst | null }
  }> {
    const tableRef = ref<DataTableInst | null>(null)
    const wrapper = mount(
      () => (
        <NDataTable
          ref={tableRef}
          columns={columns}
          data={createData()}
          maxHeight={maxHeight}
          minRowHeight={minRowHeight}
          virtualScroll={virtualScroll}
          rowKey={rowKey}
        />
      ),
      { attachTo: document.body }
    )
    await nextTick()
    return { wrapper, tableRef }
  }

  function getScrollContainer(
    wrapper: VueWrapper,
    virtualScroll: boolean
  ): HTMLElement {
    const selector = virtualScroll ? '.v-vl' : '.n-scrollbar-container'
    const el = wrapper.find(selector).element as HTMLElement
    mockScrollable(el)
    return el
  }

  it('should accept all scrollTo overloads at type level', () => {
    exerciseDataTableScrollTo(() => {})
  })

  describe('non-virtual scroll', () => {
    it('should scroll with (x, y)', async () => {
      const { wrapper, tableRef } = await createTable(false)
      const container = getScrollContainer(wrapper, false)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo(0, 280)
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 280 })
      )
      wrapper.unmount()
    })

    it('should scroll with { top }', async () => {
      const { wrapper, tableRef } = await createTable(false)
      const container = getScrollContainer(wrapper, false)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ top: 280, debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 280 })
      )
      wrapper.unmount()
    })

    it('should scroll with { left, top }', async () => {
      const { wrapper, tableRef } = await createTable(false)
      const container = getScrollContainer(wrapper, false)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ left: 12, top: 280, debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 12, top: 280 })
      )
      wrapper.unmount()
    })

    it('should scroll with { position: "top" }', async () => {
      const { wrapper, tableRef } = await createTable(false)
      const container = getScrollContainer(wrapper, false)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ position: 'top', debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 0 })
      )
      wrapper.unmount()
    })

    it('should scroll with { position: "bottom" }', async () => {
      const { wrapper, tableRef } = await createTable(false)
      const container = getScrollContainer(wrapper, false)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ position: 'bottom', debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          left: 0,
          top: Number.MAX_SAFE_INTEGER
        })
      )
      wrapper.unmount()
    })

    it('should scroll with { el }', async () => {
      const { wrapper, tableRef } = await createTable(false)
      const container = getScrollContainer(wrapper, false)
      const rowEl = wrapper.find('tbody tr').element as HTMLElement
      Object.defineProperty(rowEl, 'offsetTop', {
        configurable: true,
        value: 560
      })
      Object.defineProperty(rowEl, 'offsetHeight', {
        configurable: true,
        value: minRowHeight
      })
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ el: rowEl, debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 560 })
      )
      wrapper.unmount()
    })

    it('should scroll with { index, elSize }', async () => {
      const { wrapper, tableRef } = await createTable(false)
      const container = getScrollContainer(wrapper, false)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({
        index: 10,
        elSize: minRowHeight,
        debounce: false
      })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 10 * minRowHeight })
      )
      wrapper.unmount()
    })
  })

  describe('virtual scroll', () => {
    it('should scroll with (x, y)', async () => {
      const { wrapper, tableRef } = await createTable(true)
      const container = getScrollContainer(wrapper, true)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo(0, 280)
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 280 })
      )
      wrapper.unmount()
    })

    it('should scroll with { top }', async () => {
      const { wrapper, tableRef } = await createTable(true)
      const container = getScrollContainer(wrapper, true)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ top: 280, debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: undefined, top: 280 })
      )
      wrapper.unmount()
    })

    it('should scroll with { left, top }', async () => {
      const { wrapper, tableRef } = await createTable(true)
      const container = getScrollContainer(wrapper, true)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ left: 12, top: 280, debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 12, top: 280 })
      )
      wrapper.unmount()
    })

    it('should scroll with { position: "top" }', async () => {
      const { wrapper, tableRef } = await createTable(true)
      const container = getScrollContainer(wrapper, true)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ position: 'top', debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 0 })
      )
      wrapper.unmount()
    })

    it('should scroll with { position: "bottom" }', async () => {
      const { wrapper, tableRef } = await createTable(true)
      const container = getScrollContainer(wrapper, true)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ position: 'bottom', debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          left: 0,
          top: Number.MAX_SAFE_INTEGER
        })
      )
      wrapper.unmount()
    })

    it('should scroll with { index }', async () => {
      const { wrapper, tableRef } = await createTable(true)
      const container = getScrollContainer(wrapper, true)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ index: 10, debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 10 * minRowHeight })
      )
      wrapper.unmount()
    })

    it('should scroll with { key }', async () => {
      const { wrapper, tableRef } = await createTable(true)
      const container = getScrollContainer(wrapper, true)
      const spy = vi.spyOn(container, 'scrollTo')
      tableRef.value!.scrollTo({ key: 'row-50', debounce: false })
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ left: 0, top: 50 * minRowHeight })
      )
      wrapper.unmount()
    })
  })
})
