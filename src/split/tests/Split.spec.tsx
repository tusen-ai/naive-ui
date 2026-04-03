import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NSplit } from '../index'

describe('n-split', () => {
  it('should work with import on demand', () => {
    mount(NSplit)
  })

  it('should render with default horizontal direction', () => {
    const wrapper = mount(NSplit)
    expect(wrapper.find('.n-split').exists()).toBe(true)
    expect(wrapper.find('.n-split--horizontal').exists()).toBe(true)
    expect(wrapper.find('.n-split--vertical').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `direction` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { direction: 'vertical' }
    })
    expect(wrapper.find('.n-split--vertical').exists()).toBe(true)
    expect(wrapper.find('.n-split--horizontal').exists()).toBe(false)

    await wrapper.setProps({ direction: 'horizontal' })
    expect(wrapper.find('.n-split--horizontal').exists()).toBe(true)
    expect(wrapper.find('.n-split--vertical').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should render two panes', () => {
    const wrapper = mount(NSplit, {
      slots: {
        1: () => h('div', { class: 'pane-1-content' }, 'Pane 1'),
        2: () => h('div', { class: 'pane-2-content' }, 'Pane 2')
      }
    })
    expect(wrapper.find('.n-split-pane-1').exists()).toBe(true)
    expect(wrapper.find('.n-split-pane-2').exists()).toBe(true)
    expect(wrapper.find('.pane-1-content').text()).toBe('Pane 1')
    expect(wrapper.find('.pane-2-content').text()).toBe('Pane 2')
    wrapper.unmount()
  })

  it('should show resize trigger by default', () => {
    const wrapper = mount(NSplit)
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(true)
    expect(wrapper.find('.n-split__resize-trigger').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { disabled: true }
    })
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(
      false
    )

    await wrapper.setProps({ disabled: false })
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `pane1Class` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { pane1Class: 'custom-pane-1' }
    })
    expect(wrapper.find('.n-split-pane-1').classes()).toContain('custom-pane-1')
    wrapper.unmount()
  })

  it('should work with `pane2Class` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { pane2Class: 'custom-pane-2' }
    })
    expect(wrapper.find('.n-split-pane-2').classes()).toContain('custom-pane-2')
    wrapper.unmount()
  })

  it('should work with `pane1Style` prop (object)', () => {
    const wrapper = mount(NSplit, {
      props: { pane1Style: { background: 'red' } }
    })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain(
      'background: red'
    )
    wrapper.unmount()
  })

  it('should work with `pane2Style` prop (string)', () => {
    const wrapper = mount(NSplit, {
      props: { pane2Style: 'background: blue' }
    })
    expect(wrapper.find('.n-split-pane-2').attributes('style')).toContain(
      'background: blue'
    )
    wrapper.unmount()
  })

  it('should work with `defaultSize` prop as number', () => {
    const wrapper = mount(NSplit, {
      props: { defaultSize: 0.3 }
    })
    const pane1Style = wrapper.find('.n-split-pane-1').attributes('style')
    expect(pane1Style).toContain('30%')
    wrapper.unmount()
  })

  it('should work with `defaultSize` prop as string (px)', () => {
    const wrapper = mount(NSplit, {
      props: { defaultSize: '200px' }
    })
    const pane1Style = wrapper.find('.n-split-pane-1').attributes('style')
    expect(pane1Style).toContain('200px')
    wrapper.unmount()
  })

  it('should work with controlled `size` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { size: 0.25 }
    })
    let pane1Style = wrapper.find('.n-split-pane-1').attributes('style')
    expect(pane1Style).toContain('25%')

    await wrapper.setProps({ size: 0.75 })
    pane1Style = wrapper.find('.n-split-pane-1').attributes('style')
    expect(pane1Style).toContain('75%')
    wrapper.unmount()
  })

  it('should work with `resize-trigger` slot', () => {
    const wrapper = mount(NSplit, {
      slots: {
        'resize-trigger': () => h('div', { class: 'custom-trigger' }, 'drag me')
      }
    })
    expect(wrapper.find('.custom-trigger').exists()).toBe(true)
    expect(wrapper.find('.custom-trigger').text()).toBe('drag me')
    wrapper.unmount()
  })

  it('should work with `resizeTriggerSize` prop affecting trigger style', () => {
    const wrapper = mount(NSplit, {
      props: { resizeTriggerSize: 8 }
    })
    const triggerWrapperStyle = wrapper
      .find('.n-split__resize-trigger-wrapper')
      .attributes('style')
    expect(triggerWrapperStyle).toContain('8px')
    wrapper.unmount()
  })

  it('should work with `onDragStart` prop', async () => {
    const onDragStart = vi.fn()
    const wrapper = mount(NSplit, {
      props: { onDragStart }
    })
    const triggerWrapper = wrapper.find('.n-split__resize-trigger-wrapper')
    await triggerWrapper.trigger('mousedown')
    expect(onDragStart).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('should work with `onDragEnd` prop', async () => {
    const onDragEnd = vi.fn()
    const wrapper = mount(NSplit, {
      props: { onDragEnd }
    })
    const triggerWrapper = wrapper.find('.n-split__resize-trigger-wrapper')
    await triggerWrapper.trigger('mousedown')
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(onDragEnd).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('should apply horizontal cursor to resize trigger wrapper when direction is horizontal', () => {
    const wrapper = mount(NSplit, {
      props: { direction: 'horizontal' }
    })
    const style = wrapper
      .find('.n-split__resize-trigger-wrapper')
      .attributes('style')
    expect(style).toContain('col-resize')
    wrapper.unmount()
  })

  it('should apply vertical cursor to resize trigger wrapper when direction is vertical', () => {
    const wrapper = mount(NSplit, {
      props: { direction: 'vertical' }
    })
    const style = wrapper
      .find('.n-split__resize-trigger-wrapper')
      .attributes('style')
    expect(style).toContain('row-resize')
    wrapper.unmount()
  })
})
