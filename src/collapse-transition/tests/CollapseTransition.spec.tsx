import { mount } from '@vue/test-utils'
import { NCollapseTransition } from '../index'

describe('n-collapse', () => {
  it('should work with import on demand', () => {
    mount(NCollapseTransition)
  })

  it('should work with `show` prop', async () => {
    const wrapper = mount(NCollapseTransition)
    expect(wrapper.find('.n-collapse-transition').exists()).toBe(true)

    await wrapper.setProps({ show: false })
    expect(wrapper.find('.n-collapse-transition').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `default` slot', async () => {
    const wrapper = mount(NCollapseTransition, {
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-collapse-transition').exists()).toBe(true)
    expect(wrapper.find('.n-collapse-transition').text()).toBe('test')
    wrapper.unmount()
  })
})
