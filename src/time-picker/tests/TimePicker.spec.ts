import { mount } from '@vue/test-utils'
import { NTimePicker } from '../index'

describe('n-time-picker', () => {
  it('should work with import on demand', () => {
    mount(NTimePicker)
  })

  it('should work with `actions` prop', async () => {
    const wrapper = mount(NTimePicker, {
      attachTo: document.body
    })
    await wrapper.find('.n-input').trigger('click')
    expect(document.querySelectorAll('button').length).toBe(2)
    expect(document.querySelectorAll('button')[0].textContent).toBe('Now')
    expect(document.querySelectorAll('button')[1].textContent).toBe('OK')
    await wrapper.setProps({
      actions: ['now']
    })
    expect(document.querySelectorAll('button').length).toBe(1)
    expect(document.querySelectorAll('button')[0].textContent).toBe('Now')
    await wrapper.setProps({
      actions: ['confirm']
    })
    expect(document.querySelectorAll('button').length).toBe(1)
    expect(document.querySelectorAll('button')[0].textContent).toBe('OK')
    await wrapper.setProps({
      actions: []
    })
    expect(document.querySelectorAll('button').length).toBe(0)
    wrapper.unmount()
  })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(NTimePicker)
    expect(wrapper.find('.n-base-clear').exists()).not.toBe(true)
    await wrapper.setProps({
      clearable: true
    })
    expect(wrapper.find('.n-base-clear').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NTimePicker)
    expect(wrapper.find('.n-input').attributes('class')).not.toContain(
      'n-input--disabled'
    )
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.n-input').attributes('class')).toContain(
      'n-input--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `inputReadonly` prop', async () => {
    const wrapper = mount(NTimePicker)
    expect(wrapper.find('input').attributes('readonly')).not.toBe('')
    await wrapper.setProps({
      inputReadonly: true
    })
    expect(wrapper.find('input').attributes('readonly')).toBe('')
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NTimePicker)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select Time')
    await wrapper.setProps({
      placeholder: 'test-placeholder'
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((item) => {
      const wrapper = mount(NTimePicker, { props: { size: item } })
      expect(wrapper.find('.n-input').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `on-blur` prop', async () => {
    const onBlur = jest.fn()
    const wrapper = mount(NTimePicker, {
      props: { onBlur: onBlur }
    })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onBlur).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-focus` prop', async () => {
    const onFocus = jest.fn()
    const wrapper = mount(NTimePicker, {
      props: { onFocus: onFocus }
    })
    await wrapper.find('input').trigger('focus')
    expect(onFocus).toHaveBeenCalled()
    wrapper.unmount()
  })
})
