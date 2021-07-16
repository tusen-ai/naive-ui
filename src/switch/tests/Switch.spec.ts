import { mount } from '@vue/test-utils'
import { NSwitch } from '../index'

describe('n-switch', () => {
  it('should work with import on demand', () => {
    mount(NSwitch)
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NSwitch)
    expect(wrapper.find('.n-switch--disabled').exists()).not.toBe(true)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-switch').classes()).toContain('n-switch--disabled')
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NSwitch)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-switch').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-switch').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-switch').attributes('style')).toMatchSnapshot()
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NSwitch, { props: { value: true } })
    expect(wrapper.find('.n-switch--active').exists()).toBe(true)

    await wrapper.setProps({ value: false })
    expect(wrapper.find('.n-switch--active').exists()).not.toBe(true)
  })

  it('should work with `on-update:value` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mount(NSwitch, { props: { 'onUpdate:value': onUpdate } })

    await wrapper.trigger('click')
    expect(onUpdate).toHaveBeenCalled()
  })
})
