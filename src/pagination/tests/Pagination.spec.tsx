import type { VueWrapper } from '@vue/test-utils'
import type { PaginationInfo, PaginationRenderLabel } from '../index'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { NPagination } from '../index'

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
