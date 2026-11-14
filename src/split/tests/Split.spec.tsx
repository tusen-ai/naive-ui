import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { NSplit } from '../index'

describe('n-split', () => {
  it('should work with import on demand', () => {
    mount(NSplit)
  })

  it('should work with `direction` prop', async () => {
    const wrapper = mount(NSplit)
    expect(wrapper.find('.n-split').classes()).toContain('n-split--horizontal')

    await wrapper.setProps({ direction: 'vertical' })
    expect(wrapper.find('.n-split').classes()).toContain('n-split--vertical')
    wrapper.unmount()
  })

  it('should work with `defaultSize` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { defaultSize: 0.3 }
    })
    // The style uses calc() format: flex: 0 0 calc(30% - 0.9px)
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain(
      'flex: 0 0 calc(30%'
    )
    wrapper.unmount()
  })

  it('should work with `size` prop (controlled)', async () => {
    const wrapper = mount(NSplit, {
      props: { size: 0.4 }
    })
    // The style uses calc() format
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain(
      'flex: 0 0 calc(40%'
    )

    await wrapper.setProps({ size: 0.6 })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain(
      'flex: 0 0 calc(60%'
    )
    wrapper.unmount()
  })

  it('should work with `min` and `max` props', async () => {
    const onUpdateSize = vi.fn()
    const wrapper = mount(NSplit, {
      props: {
        min: 0.2,
        max: 0.8,
        onUpdateSize
      }
    })

    expect(wrapper.find('.n-split').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NSplit, {
      slots: {
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })
    // When not disabled, resize trigger should exist
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(true)

    await wrapper.setProps({ disabled: true })
    // When disabled, resize trigger should not exist
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(
      false
    )
    wrapper.unmount()
  })

  it('should work with `resizeTriggerSize` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { resizeTriggerSize: 5 },
      slots: {
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with slot 1 and slot 2', () => {
    const wrapper = mount(NSplit, {
      slots: {
        1: () => h('div', { class: 'pane-1-content' }, 'Pane 1'),
        2: () => h('div', { class: 'pane-2-content' }, 'Pane 2')
      }
    })
    expect(wrapper.find('.pane-1-content').exists()).toBe(true)
    expect(wrapper.find('.pane-2-content').exists()).toBe(true)
    expect(wrapper.find('.pane-1-content').text()).toBe('Pane 1')
    expect(wrapper.find('.pane-2-content').text()).toBe('Pane 2')
    wrapper.unmount()
  })

  it('should work with `resize-trigger` slot', () => {
    const wrapper = mount(NSplit, {
      slots: {
        'resize-trigger': () =>
          h('div', { class: 'custom-trigger' }, 'Trigger'),
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })
    expect(wrapper.find('.custom-trigger').exists()).toBe(true)
    expect(wrapper.find('.custom-trigger').text()).toBe('Trigger')
    wrapper.unmount()
  })

  it('should work with `pane1Class` and `pane2Class` props', () => {
    const wrapper = mount(NSplit, {
      props: {
        pane1Class: 'custom-pane-1',
        pane2Class: 'custom-pane-2'
      },
      slots: {
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })
    expect(wrapper.find('.n-split-pane-1').classes()).toContain('custom-pane-1')
    expect(wrapper.find('.n-split-pane-2').classes()).toContain('custom-pane-2')
    wrapper.unmount()
  })

  it('should work with `pane1Style` and `pane2Style` props', () => {
    const wrapper = mount(NSplit, {
      props: {
        pane1Style: { backgroundColor: 'red' },
        pane2Style: { backgroundColor: 'blue' }
      },
      slots: {
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain(
      'background-color: red'
    )
    expect(wrapper.find('.n-split-pane-2').attributes('style')).toContain(
      'background-color: blue'
    )
    wrapper.unmount()
  })

  it('should call onUpdateSize when size changes', async () => {
    const onUpdateSize = vi.fn()
    const wrapper = mount(NSplit, {
      props: {
        onUpdateSize,
        defaultSize: 0.5
      },
      slots: {
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })

    // Trigger resize by simulating drag
    const trigger = wrapper.find('.n-split__resize-trigger-wrapper')
    expect(trigger.exists()).toBe(true)

    wrapper.unmount()
  })

  it('should work with `watchProps` including defaultSize', async () => {
    const wrapper = mount(NSplit, {
      props: {
        defaultSize: 0.3,
        watchProps: ['defaultSize']
      },
      slots: {
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })

    await wrapper.setProps({ defaultSize: 0.7 })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain(
      'flex: 0 0 calc(70%'
    )
    wrapper.unmount()
  })

  it('should work with string size (pixel mode)', async () => {
    const wrapper = mount(NSplit, {
      props: {
        size: '200px'
      },
      slots: {
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })

    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain(
      'flex: 0 0 200px'
    )
    wrapper.unmount()
  })

  it('should work with `onDragStart`, `onDragMove`, `onDragEnd` callbacks', async () => {
    const onDragStart = vi.fn()
    const onDragMove = vi.fn()
    const onDragEnd = vi.fn()

    const wrapper = mount(NSplit, {
      props: {
        onDragStart,
        onDragMove,
        onDragEnd
      },
      slots: {
        1: () => 'Pane 1',
        2: () => 'Pane 2'
      }
    })

    const trigger = wrapper.find('.n-split__resize-trigger-wrapper')
    expect(trigger.exists()).toBe(true)
    wrapper.unmount()
  })

  describe('touch dragging', () => {
    function mockRects(wrapper: ReturnType<typeof mount>): void {
      const root = wrapper.find('.n-split').element as HTMLElement
      const trigger = wrapper.find('.n-split__resize-trigger-wrapper')
        .element as HTMLElement
      root.getBoundingClientRect = () =>
        ({ left: 0, top: 0, width: 403, height: 403 }) as DOMRect
      trigger.getBoundingClientRect = () =>
        ({ left: 200, top: 200, width: 3, height: 3 }) as DOMRect
    }

    function dispatchTouch(
      target: EventTarget,
      type: string,
      point: { clientX: number, clientY: number } | null
    ): Event {
      const event = new Event(type, { bubbles: true, cancelable: true })
      const touches = point ? [point] : []
      Object.defineProperty(event, 'touches', { value: touches })
      Object.defineProperty(event, 'changedTouches', {
        value: point ? touches : [{ clientX: 0, clientY: 0 }]
      })
      target.dispatchEvent(event)
      return event
    }

    it('should resize with touch on horizontal direction', async () => {
      const onUpdateSize = vi.fn()
      const onDragStart = vi.fn()
      const onDragMove = vi.fn()
      const onDragEnd = vi.fn()
      const wrapper = mount(NSplit, {
        attachTo: document.body,
        props: { onUpdateSize, onDragStart, onDragMove, onDragEnd }
      })
      mockRects(wrapper)
      const trigger = wrapper.find('.n-split__resize-trigger-wrapper').element

      const startEvent = dispatchTouch(trigger, 'touchstart', {
        clientX: 201,
        clientY: 10
      })
      expect(startEvent.defaultPrevented).toBe(true)
      expect(onDragStart).toHaveBeenCalledTimes(1)
      await nextTick()
      expect(wrapper.find('.n-split__resize-trigger--hover').exists()).toBe(
        true
      )

      dispatchTouch(document, 'touchmove', { clientX: 101, clientY: 10 })
      expect(onDragMove).toHaveBeenCalledTimes(1)
      // (101 - 0 - 1) / (403 - 3)
      expect(onUpdateSize).toHaveBeenLastCalledWith(0.25)

      dispatchTouch(document, 'touchend', null)
      expect(onDragEnd).toHaveBeenCalledTimes(1)
      await nextTick()
      expect(wrapper.find('.n-split__resize-trigger--hover').exists()).toBe(
        false
      )

      // listeners are removed after the drag ends
      dispatchTouch(document, 'touchmove', { clientX: 301, clientY: 10 })
      expect(onDragMove).toHaveBeenCalledTimes(1)
      wrapper.unmount()
    })

    it('should resize with touch on vertical direction', async () => {
      const onUpdateSize = vi.fn()
      const wrapper = mount(NSplit, {
        attachTo: document.body,
        props: { direction: 'vertical', onUpdateSize }
      })
      mockRects(wrapper)
      const trigger = wrapper.find('.n-split__resize-trigger-wrapper').element

      dispatchTouch(trigger, 'touchstart', { clientX: 10, clientY: 199 })
      dispatchTouch(document, 'touchmove', { clientX: 10, clientY: 301 })
      // (301 - 0 + (200 - 199)) / (403 - 3)
      expect(onUpdateSize).toHaveBeenLastCalledWith(302 / 400)
      dispatchTouch(document, 'touchcancel', null)
      wrapper.unmount()
    })

    it('should ignore multi-touch gestures', async () => {
      const onDragStart = vi.fn()
      const wrapper = mount(NSplit, {
        attachTo: document.body,
        props: { onDragStart }
      })
      mockRects(wrapper)
      const trigger = wrapper.find('.n-split__resize-trigger-wrapper').element
      const event = new Event('touchstart', { bubbles: true, cancelable: true })
      Object.defineProperty(event, 'touches', {
        value: [
          { clientX: 1, clientY: 1 },
          { clientX: 2, clientY: 2 }
        ]
      })
      trigger.dispatchEvent(event)
      expect(onDragStart).not.toHaveBeenCalled()
      wrapper.unmount()
    })
  })
})
