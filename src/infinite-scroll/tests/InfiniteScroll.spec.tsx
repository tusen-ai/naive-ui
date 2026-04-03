import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { NInfiniteScroll } from '../index'

describe('n-infinite-scroll', () => {
  it('should work with import on demand', () => {
    mount(NInfiniteScroll)
  })

  it('should render default slot content', () => {
    const wrapper = mount(NInfiniteScroll, {
      slots: {
        default: () => h('div', { class: 'inner-content' }, 'scroll content')
      }
    })
    expect(wrapper.find('.inner-content').exists()).toBe(true)
    expect(wrapper.find('.inner-content').text()).toBe('scroll content')
    wrapper.unmount()
  })

  it('should render without slot content', () => {
    const wrapper = mount(NInfiniteScroll)
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it('should call `onLoad` when scrolled to the bottom', async () => {
    const onLoad = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(NInfiniteScroll, {
      props: { onLoad, distance: 0 }
    })

    const scrollbarInst = (wrapper.vm as any).scrollbarInstRef
    if (scrollbarInst) {
      // Simulate scroll container at the bottom
      Object.defineProperty(scrollbarInst.containerRef, 'scrollHeight', {
        configurable: true,
        get: () => 500
      })
      Object.defineProperty(scrollbarInst.containerRef, 'clientHeight', {
        configurable: true,
        get: () => 300
      })
      Object.defineProperty(scrollbarInst.containerRef, 'scrollTop', {
        configurable: true,
        get: () => 200
      })
    }

    await wrapper.vm.handleScroll()
    await nextTick()

    expect(onLoad).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('should not call `onLoad` when not scrolled to the bottom', async () => {
    const onLoad = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(NInfiniteScroll, {
      props: { onLoad, distance: 0 }
    })

    const scrollbarInst = (wrapper.vm as any).scrollbarInstRef
    if (scrollbarInst) {
      Object.defineProperty(scrollbarInst.containerRef, 'scrollHeight', {
        configurable: true,
        get: () => 500
      })
      Object.defineProperty(scrollbarInst.containerRef, 'clientHeight', {
        configurable: true,
        get: () => 300
      })
      Object.defineProperty(scrollbarInst.containerRef, 'scrollTop', {
        configurable: true,
        get: () => 100
      })
    }

    await wrapper.vm.handleScroll()
    await nextTick()

    expect(onLoad).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should not call `onLoad` on upward wheel event', async () => {
    const onLoad = vi.fn()
    const wrapper = mount(NInfiniteScroll, {
      props: { onLoad }
    })

    const scrollbarInst = (wrapper.vm as any).scrollbarInstRef
    if (scrollbarInst) {
      Object.defineProperty(scrollbarInst.containerRef, 'scrollHeight', {
        configurable: true,
        get: () => 500
      })
      Object.defineProperty(scrollbarInst.containerRef, 'clientHeight', {
        configurable: true,
        get: () => 300
      })
      Object.defineProperty(scrollbarInst.containerRef, 'scrollTop', {
        configurable: true,
        get: () => 200
      })
    }

    await wrapper.vm.handleWheel(new WheelEvent('wheel', { deltaY: -10 }))
    await nextTick()

    expect(onLoad).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `distance` prop', async () => {
    const onLoad = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(NInfiniteScroll, {
      props: { onLoad, distance: 100 }
    })

    const scrollbarInst = (wrapper.vm as any).scrollbarInstRef
    if (scrollbarInst) {
      // scrollTop (350) + clientHeight (300) = 650 >= scrollHeight (700) - distance (100) = 600
      Object.defineProperty(scrollbarInst.containerRef, 'scrollHeight', {
        configurable: true,
        get: () => 700
      })
      Object.defineProperty(scrollbarInst.containerRef, 'clientHeight', {
        configurable: true,
        get: () => 300
      })
      Object.defineProperty(scrollbarInst.containerRef, 'scrollTop', {
        configurable: true,
        get: () => 350
      })
    }

    await wrapper.vm.handleScroll()
    await nextTick()

    expect(onLoad).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
