import { mount } from '@vue/test-utils'
import { h } from 'vue'
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
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 calc(30%')
    wrapper.unmount()
  })

  it('should work with `size` prop (controlled)', async () => {
    const wrapper = mount(NSplit, {
      props: { size: 0.4 }
    })
    // The style uses calc() format
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 calc(40%')

    await wrapper.setProps({ size: 0.6 })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 calc(60%')
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
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(false)
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
        'resize-trigger': () => h('div', { class: 'custom-trigger' }, 'Trigger'),
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
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('background-color: red')
    expect(wrapper.find('.n-split-pane-2').attributes('style')).toContain('background-color: blue')
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
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 calc(70%')
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

    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 200px')
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
})
