import type { VueWrapper } from '@vue/test-utils'
import type { PaginationInfo, PaginationRenderLabel } from '../index'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { NPopselect } from '../../popselect'
import { NPagination } from '../index'

async function clickWithDetail(
  element: Element,
  detail: number
): Promise<void> {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, detail }))
  await nextTick()
}

function findPageItem(
  wrapper: VueWrapper,
  label: string
): ReturnType<VueWrapper['findAll']>[number] | undefined {
  return wrapper
    .findAll('.n-pagination-item')
    .find(item => item.text() === label)
}

async function collectRuntimeErrors(
  run: (pushError: (error: unknown) => void) => Promise<void>
): Promise<unknown[]> {
  const errors: unknown[] = []
  const pushError = (error: unknown): void => {
    errors.push(error)
  }
  const handleRejection = (event: PromiseRejectionEvent): void => {
    pushError(event.reason)
  }
  window.addEventListener('unhandledrejection', handleRejection)
  try {
    await run(pushError)
    await nextTick()
    await nextTick()
  }
  finally {
    window.removeEventListener('unhandledrejection', handleRejection)
  }
  return errors
}

describe('n-pagination', () => {
  it('should work with import on demand', () => {
    mount(NPagination)
  })
  it.each([0, 1])(
    'should open fast-jump menu %i on touch without changing page',
    async (index) => {
      const onUpdatePage = vi.fn()
      const wrapper = mount(NPagination, {
        attachTo: document.body,
        props: { defaultPage: 25, pageCount: 50, onUpdatePage }
      })
      const menus = wrapper.findAllComponents(NPopselect)
      const item = menus[index].get('.n-pagination-item')
      await item.trigger('pointerdown', { pointerType: 'touch' })
      // Older browsers dispatch a MouseEvent for the click after a touch.
      await clickWithDetail(item.element, 1)
      expect(onUpdatePage).not.toHaveBeenCalled()
      expect(menus[index].props('show')).toBe(true)
      expect(menus[1 - index].props('show')).toBe(false)

      document.body.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      )
      document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
      await nextTick()
      expect(menus[index].props('show')).toBe(false)

      await item.trigger('pointerdown', { pointerType: 'mouse' })
      await clickWithDetail(item.element, 1)
      expect(onUpdatePage).toHaveBeenCalledWith(index === 0 ? 22 : 28)
      wrapper.unmount()
    }
  )
  it.each([0, 1])(
    'should preserve zero-detail fast jump %i after a touch',
    async (index) => {
      const onUpdatePage = vi.fn()
      const wrapper = mount(NPagination, {
        props: { defaultPage: 25, pageCount: 50, onUpdatePage }
      })
      const menu = wrapper.findAllComponents(NPopselect)[index]
      const item = menu.get('.n-pagination-item')
      await item.trigger('pointerdown', { pointerType: 'touch' })
      await clickWithDetail(item.element, 1)
      expect(onUpdatePage).not.toHaveBeenCalled()
      await clickWithDetail(item.element, 0)
      expect(onUpdatePage).toHaveBeenCalledWith(index === 0 ? 22 : 28)
      wrapper.unmount()
    }
  )
  it.each([0, 1])(
    'should preserve touch fast jump %i when the dropdown is disabled',
    async (index) => {
      const onUpdatePage = vi.fn()
      const wrapper = mount(NPagination, {
        props: {
          defaultPage: 25,
          pageCount: 50,
          showQuickJumpDropdown: false,
          onUpdatePage
        }
      })
      const item = wrapper
        .findAll('.n-pagination-item')
        .filter(item => item.find('.n-base-icon').exists())[index + 1]
      await item.trigger('pointerdown', { pointerType: 'touch' })
      await clickWithDetail(item.element, 1)
      expect(onUpdatePage).toHaveBeenCalledWith(index === 0 ? 22 : 28)
      wrapper.unmount()
    }
  )
  it.each([0, 1])(
    'should ignore touch on disabled fast-jump menu %i',
    async (index) => {
      const onUpdatePage = vi.fn()
      const wrapper = mount(NPagination, {
        props: { defaultPage: 25, pageCount: 50, disabled: true, onUpdatePage }
      })
      const menu = wrapper.findAllComponents(NPopselect)[index]
      const item = menu.get('.n-pagination-item')
      await item.trigger('pointerdown', { pointerType: 'touch' })
      await clickWithDetail(item.element, 1)
      expect(onUpdatePage).not.toHaveBeenCalled()
      expect(menu.props('show')).toBe(false)
      wrapper.unmount()
    }
  )
  it('should work with `size` prop', async () => {
    const wrapper = mount(NPagination, {
      props: {
        pageCount: 20
      }
    })
    expect(wrapper.attributes('style')).toContain('--n-item-size: 28px;')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.attributes('style')).toContain('--n-item-size: 22px;')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.attributes('style')).toContain('--n-item-size: 34px;')
    wrapper.unmount()
  })
  it('props.itemCount', async () => {
    const wrapper = mount(NPagination, {
      props: {
        itemCount: 1,
        pageSize: 10
      }
    })
    expect(wrapper.findAll('.n-pagination-item').length).toEqual(3)
    await wrapper.setProps({
      itemCount: 11
    })
    expect(wrapper.findAll('.n-pagination-item').length).toEqual(4)
    wrapper.unmount()
  })
  it('should work with corrent pagination info', async () => {
    let paginationInfo: PaginationInfo | undefined
    const wrapper = mount(NPagination, {
      props: {
        itemCount: 1,
        pageSize: 10,
        prefix: (info: PaginationInfo) => {
          paginationInfo = info
        }
      }
    })
    expect(wrapper.findAll('.n-pagination-item').length).toEqual(3)
    expect(paginationInfo?.itemCount).toBe(1)
    expect(paginationInfo?.page).toBe(1)
    expect(paginationInfo?.pageCount).toBe(1)
    expect(paginationInfo?.pageSize).toBe(10)
    expect(paginationInfo?.startIndex).toBe(0)
    expect(paginationInfo?.endIndex).toBe(0)
    await wrapper.setProps({
      itemCount: 12,
      pageSize: 5,
      page: 3
    })
    expect(paginationInfo?.itemCount).toBe(12)
    expect(paginationInfo?.pageSize).toBe(5)
    expect(paginationInfo?.page).toBe(3)
    expect(paginationInfo?.pageCount).toBe(3)
    expect(paginationInfo?.startIndex).toBe(10)
    expect(paginationInfo?.endIndex).toBe(11)
    wrapper.unmount()
  })
  it('should work with prev slot', async () => {
    const wrapper = mount(NPagination, {
      slots: {
        prev: () => 'Prev'
      }
    })
    expect(wrapper.find('.n-pagination-item').text()).toContain('Prev')
    wrapper.unmount()
  })
  it('page-sizes should has correct type', () => {
    ;(() => (
      <NPagination
        pageSizes={[
          10,
          {
            label: '20',
            value: 20
          }
        ]}
      />
    ))()
  })
  it('has currect default page size', () => {
    const wrapper = mount(() => (
      <NPagination pageSizes={[23, 22]} showSizePicker />
    ))
    expect(wrapper.find('.n-base-selection-input__content').text()).toContain(
      '23'
    )
    wrapper.unmount()
  })
  it('should not throw when jumping from last page to first page', async () => {
    const errors = await collectRuntimeErrors(async (pushError) => {
      const wrapper = mount(NPagination, {
        attachTo: document.body,
        props: {
          page: 1,
          pageCount: 200,
          'onUpdate:page': (page: number) => {
            void wrapper.setProps({ page })
          }
        },
        global: {
          config: {
            errorHandler: (error) => {
              pushError(error)
            }
          }
        }
      })
      const lastPage = findPageItem(wrapper, '200')
      expect(lastPage).toBeTruthy()
      await lastPage!.trigger('click')
      expect(wrapper.props('page')).toBe(200)
      const firstPage = findPageItem(wrapper, '1')
      expect(firstPage).toBeTruthy()
      await firstPage!.trigger('click')
      expect(wrapper.props('page')).toBe(1)
      wrapper.unmount()
    })
    expect(errors).toEqual([])
  })
})
it('should work with label slot', async () => {
  const labelSlot: PaginationRenderLabel = (props) => {
    if (props.type === 'page')
      return `(${props.node})`
    return props.node
  }
  const wrapper = mount(NPagination, {
    slots: {
      label: labelSlot
    }
  })
  await wrapper.setProps({
    itemCount: 1
  })
  expect(wrapper.findAll('.n-pagination-item')[1].text()).toContain('(1)')
  wrapper.unmount()
})
