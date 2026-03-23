import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NVirtualList } from '../index'

describe('n-virtual-list', () => {
  it('should work with import on demand', () => {
    mount(NVirtualList, {
      props: { itemSize: 50 }
    })
  })

  it('should render with required props', () => {
    const wrapper = mount(NVirtualList, {
      props: { itemSize: 50 }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `items` prop', () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      key: i,
      value: `Item ${i}`
    }))
    const wrapper = mount(NVirtualList, {
      props: {
        items,
        itemSize: 50
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `itemSize` prop', () => {
    const wrapper = mount(NVirtualList, {
      props: { itemSize: 100 }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `itemResizable` prop', () => {
    const wrapper = mount(NVirtualList, {
      props: {
        itemSize: 50,
        itemResizable: true
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `itemsStyle` prop', () => {
    const wrapper = mount(NVirtualList, {
      props: {
        itemSize: 50,
        itemsStyle: { backgroundColor: 'red' }
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `visibleItemsTag` prop', () => {
    const wrapper = mount(NVirtualList, {
      props: {
        itemSize: 50,
        visibleItemsTag: 'ul'
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `keyField` prop', () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: `Item ${i}`
    }))
    const wrapper = mount(NVirtualList, {
      props: {
        items,
        itemSize: 50,
        keyField: 'id'
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `paddingTop` prop', () => {
    const wrapper = mount(NVirtualList, {
      props: {
        itemSize: 50,
        paddingTop: 20
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `paddingBottom` prop', () => {
    const wrapper = mount(NVirtualList, {
      props: {
        itemSize: 50,
        paddingBottom: 20
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `scrollbarProps` prop', () => {
    const wrapper = mount(NVirtualList, {
      props: {
        itemSize: 50,
        scrollbarProps: {
          style: { height: '300px' }
        }
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render default slot correctly', () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
      key: i,
      value: `Item ${i}`
    }))
    const wrapper = mount(NVirtualList, {
      props: {
        items,
        itemSize: 50
      },
      slots: {
        default: ({ item }: any) => `Item ${item.value}`
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `ignoreItemResize` prop', () => {
    const wrapper = mount(NVirtualList, {
      props: {
        itemSize: 50,
        ignoreItemResize: true
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `defaultScrollKey` prop', () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
      key: `item-${i}`,
      value: `Item ${i}`
    }))
    const wrapper = mount(NVirtualList, {
      props: {
        items,
        itemSize: 50,
        defaultScrollKey: 'item-5'
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `defaultScrollIndex` prop', () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
      key: i,
      value: `Item ${i}`
    }))
    const wrapper = mount(NVirtualList, {
      props: {
        items,
        itemSize: 50,
        defaultScrollIndex: 5
      }
    })
    expect(wrapper.find('.n-scrollbar').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should expose scrollTo method', async () => {
    const wrapper = mount(NVirtualList, {
      props: { itemSize: 50 }
    })
    const vm = wrapper.vm as any
    expect(typeof vm.scrollTo).toBe('function')
    wrapper.unmount()
  })

  it('should expose getScrollContainer method', async () => {
    const wrapper = mount(NVirtualList, {
      props: { itemSize: 50 }
    })
    const vm = wrapper.vm as any
    expect(typeof vm.getScrollContainer).toBe('function')
    wrapper.unmount()
  })

  it('should expose getScrollContent method', async () => {
    const wrapper = mount(NVirtualList, {
      props: { itemSize: 50 }
    })
    const vm = wrapper.vm as any
    expect(typeof vm.getScrollContent).toBe('function')
    wrapper.unmount()
  })
})
