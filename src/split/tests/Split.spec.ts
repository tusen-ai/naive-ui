import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { NSplit } from '../index'

describe('n-split', () => {
  it('should work with import on demand', () => {
    mount(NSplit)
  })

  it('should work with `direction` prop', () => {
    const wrapper = mount(NSplit)
    expect(wrapper.find('.n-split').classes()).toContain('n-split--horizontal')
    wrapper.unmount()
  })

  it('should work with vertical `direction` prop', () => {
    const wrapper = mount(NSplit, {
      props: {
        direction: 'vertical'
      }
    })
    expect(wrapper.find('.n-split').classes()).toContain('n-split--vertical')
    wrapper.unmount()
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(NSplit, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `defaultSize` prop', () => {
    const wrapper = mount(NSplit, {
      props: {
        defaultSize: 0.3
      }
    })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 calc(30%')
    wrapper.unmount()
  })

  it('should work with string `defaultSize` prop', () => {
    const wrapper = mount(NSplit, {
      props: {
        defaultSize: '200px'
      }
    })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 200px')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NSplit, {
      props: {
        size: 0.4
      }
    })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 calc(40%')
    await wrapper.setProps({ size: 0.6 })
    expect(wrapper.find('.n-split-pane-1').attributes('style')).toContain('flex: 0 0 calc(60%')
    wrapper.unmount()
  })

  it('should work with `min` and `max` props', () => {
    const wrapper = mount(NSplit, {
      props: {
        defaultSize: 0.5,
        min: 0.2,
        max: 0.8
      }
    })
    expect(wrapper.find('.n-split-pane-1').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `resizeTriggerSize` prop', () => {
    const wrapper = mount(NSplit, {
      props: {
        resizeTriggerSize: 10
      }
    })
    expect(wrapper.find('.n-split__resize-trigger-wrapper').attributes('style')).toContain('width: 10px')
    wrapper.unmount()
  })

  it('should work with pane slots', () => {
    const wrapper = mount(NSplit, {
      slots: {
        1: () => h('div', 'Pane 1 Content'),
        2: () => h('div', 'Pane 2 Content')
      }
    })
    expect(wrapper.find('.n-split-pane-1').text()).toBe('Pane 1 Content')
    expect(wrapper.find('.n-split-pane-2').text()).toBe('Pane 2 Content')
    wrapper.unmount()
  })

  it('should work with `pane1Class` and `pane2Class` props', () => {
    const wrapper = mount(NSplit, {
      props: {
        pane1Class: 'custom-pane-1',
        pane2Class: 'custom-pane-2'
      }
    })
    expect(wrapper.find('.n-split-pane-1').classes()).toContain('custom-pane-1')
    expect(wrapper.find('.n-split-pane-2').classes()).toContain('custom-pane-2')
    wrapper.unmount()
  })

  it('should work with `onUpdate:size` event', async () => {
    const onUpdateSize = vi.fn()
    const wrapper = mount(NSplit, {
      props: {
        'onUpdate:size': onUpdateSize
      }
    })
    
    // 触发拖拽开始
    const resizeTrigger = wrapper.find('.n-split__resize-trigger-wrapper')
    await resizeTrigger.trigger('mousedown', { clientX: 0, clientY: 0 })
    
    // 模拟鼠标移动
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 0 }))
    await nextTick()
    
    // 模拟鼠标释放
    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    
    wrapper.unmount()
  })

  it('should work with drag events', async () => {
    const onDragStart = vi.fn()
    
    const wrapper = mount(NSplit, {
      props: {
        onDragStart
      }
    })
    
    const resizeTrigger = wrapper.find('.n-split__resize-trigger-wrapper')
    await resizeTrigger.trigger('mousedown', { clientX: 0, clientY: 0 })
    
    expect(onDragStart).toHaveBeenCalled()
    
    // Clean up document event listeners
    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    
    wrapper.unmount()
  })

  it('should apply correct styles for vertical direction', () => {
    const wrapper = mount(NSplit, {
      props: {
        direction: 'vertical',
        resizeTriggerSize: 8
      }
    })
    expect(wrapper.find('.n-split__resize-trigger-wrapper').attributes('style')).toContain('height: 8px')
    expect(wrapper.find('.n-split__resize-trigger-wrapper').attributes('style')).toContain('cursor: row-resize')
    wrapper.unmount()
  })
})
