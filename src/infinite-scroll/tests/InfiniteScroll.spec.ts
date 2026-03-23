import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NInfiniteScroll } from '../index'

describe('n-infinite-scroll', () => {
  it('should work with import on demand', () => {
    mount(NInfiniteScroll)
  })

  it('should render with default props', () => {
    const wrapper = mount(NInfiniteScroll)
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render default slot content', () => {
    const items = ['item1', 'item2', 'item3']
    const wrapper = mount(NInfiniteScroll, {
      slots: {
        default: () => items.map(item => `<div>${item}</div>`)
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `distance` prop', () => {
    const wrapper = mount(NInfiniteScroll, {
      props: { distance: 100 }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `onLoad` prop', async () => {
    const onLoad = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(NInfiniteScroll, {
      props: { onLoad }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `scrollbarProps` prop', () => {
    const wrapper = mount(NInfiniteScroll, {
      props: {
        scrollbarProps: {
          style: { height: '300px' }
        }
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render content correctly', () => {
    const wrapper = mount(NInfiniteScroll, {
      slots: {
        default: () => [
          'Item 1',
          'Item 2',
          'Item 3'
        ]
      }
    })
    expect(wrapper.text()).toContain('Item 1')
    expect(wrapper.text()).toContain('Item 2')
    expect(wrapper.text()).toContain('Item 3')
    wrapper.unmount()
  })

  it('should handle async onLoad', async () => {
    const onLoad = vi.fn().mockImplementation(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 100)
      })
    })
    const wrapper = mount(NInfiniteScroll, {
      props: { onLoad }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with zero distance', () => {
    const wrapper = mount(NInfiniteScroll, {
      props: { distance: 0 }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })
})
