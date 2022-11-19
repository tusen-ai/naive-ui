import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NPagination, PaginationRenderLabel, PaginationInfo } from '../index'

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
  })
  it('should work with prev slot', async () => {
    const wrapper = mount(NPagination, {
      slots: {
        prev: () => 'Prev'
      }
    })
    expect(wrapper.find('.n-pagination-item').text()).toContain('Prev')
  })
  it('page-sizes should has correct type', () => {
    ;<NPagination
      pageSizes={[
        10,
        {
          label: '20',
          value: 20
        }
      ]}
    />
  })
  it('has currect default page size', () => {
    const wrapper = mount(() => (
      <NPagination pageSizes={[23, 22]} showSizePicker />
    ))
    expect(wrapper.find('.n-base-selection-input__content').text()).toContain(
      '23'
    )
  })
})
it('should work with label slot', async () => {
  const labelSlot: PaginationRenderLabel = (props) => {
    if (props.type === 'page') return `(${props.node})`
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
})
