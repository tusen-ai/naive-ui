import { mount } from '@vue/test-utils'
import { NInfiniteScroll } from '../index'

describe('n-infinite-scroll', () => {
  it('should work with import on demand', () => {
    mount(NInfiniteScroll)
  })

  it('should call native `scroll` and `wheel` listeners', async () => {
    const onScroll = vi.fn()
    const onWheel = vi.fn()
    const onLoad = vi.fn()
    const errorHandler = vi.fn()
    const wrapper = mount(NInfiniteScroll, {
      props: { onLoad },
      attrs: { onScroll, onWheel },
      slots: { default: () => 'test n-infinite-scroll' },
      global: { config: { errorHandler } }
    })

    const container = wrapper.find('.n-scrollbar-container')
    await container.trigger('scroll')
    await container.trigger('wheel', { deltaY: 1 })
    expect(onScroll).toHaveBeenCalledTimes(1)
    expect(onWheel).toHaveBeenCalledTimes(1)
    expect(onLoad).toHaveBeenCalled()
    expect(errorHandler).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
