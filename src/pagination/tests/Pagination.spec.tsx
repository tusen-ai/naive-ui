import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NPagination } from '../index'

describe('n-pagination', () => {
  it('should work with import on demand', () => {
    mount(NPagination)
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
})
