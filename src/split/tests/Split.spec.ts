import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NSplit } from '../index'

describe('n-split', () => {
  it('should work with import on demand', () => {
    mount(NSplit)
  })

  it('should render with default props', () => {
    const wrapper = mount(NSplit)
    expect(wrapper.find('.n-split').exists()).toBe(true)
    expect(wrapper.find('.n-split--horizontal').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `direction` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { direction: 'vertical' }
    })
    expect(wrapper.find('.n-split--vertical').exists()).toBe(true)

    await wrapper.setProps({ direction: 'horizontal' })
    expect(wrapper.find('.n-split--horizontal').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NSplit)
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(true)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-split__resize-trigger-wrapper').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should render slots correctly', () => {
    const wrapper = mount(NSplit, {
      slots: {
        1: () => 'Left Panel',
        2: () => 'Right Panel'
      }
    })
    expect(wrapper.text()).toContain('Left Panel')
    expect(wrapper.text()).toContain('Right Panel')
    wrapper.unmount()
  })

  it('should work with `resizeTriggerSize` prop', () => {
    const wrapper = mount(NSplit, {
      props: { resizeTriggerSize: 10 }
    })
    const triggerWrapper = wrapper.find('.n-split__resize-trigger-wrapper')
    expect(triggerWrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `defaultSize` prop', async () => {
    const wrapper = mount(NSplit, {
      props: { defaultSize: 0.3 }
    })
    expect(wrapper.find('.n-split-pane-1').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `min` and `max` props', () => {
    const wrapper = mount(NSplit, {
      props: {
        min: 0.1,
        max: 0.9
      }
    })
    expect(wrapper.find('.n-split').exists()).toBe(true)
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

  it('should work with `pane1Style` and `pane2Style` props', () => {
    const wrapper = mount(NSplit, {
      props: {
        pane1Style: { backgroundColor: 'red' },
        pane2Style: { backgroundColor: 'blue' }
      }
    })
    expect(wrapper.find('.n-split-pane-1').exists()).toBe(true)
    expect(wrapper.find('.n-split-pane-2').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with pixel value for size', () => {
    const wrapper = mount(NSplit, {
      props: {
        defaultSize: '200px'
      }
    })
    expect(wrapper.find('.n-split-pane-1').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with pixel value for min and max', () => {
    const wrapper = mount(NSplit, {
      props: {
        min: '100px',
        max: '400px'
      }
    })
    expect(wrapper.find('.n-split').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `watchProps` prop', async () => {
    const wrapper = mount(NSplit, {
      props: {
        defaultSize: 0.5,
        watchProps: ['defaultSize']
      }
    })
    expect(wrapper.find('.n-split').exists()).toBe(true)

    await wrapper.setProps({ defaultSize: 0.3 })
    await nextTick()
    wrapper.unmount()
  })

  it('should work with custom resize-trigger slot', () => {
    const wrapper = mount(NSplit, {
      slots: {
        'resize-trigger': () => 'Custom Trigger'
      }
    })
    expect(wrapper.text()).toContain('Custom Trigger')
    wrapper.unmount()
  })
})
