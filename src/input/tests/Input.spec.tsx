import { mount } from '@vue/test-utils'
import { NInput } from '../index'

describe('n-input', () => {
  it('should work with import on demand', () => {
    mount(NInput)
  })

  it('should call input callbacks', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mount(NInput, {
      props: {
        onUpdateValue
      }
    })
    wrapper.find('input').element.value = 'cool'
    await wrapper.find('input').trigger('input')
    expect(onUpdateValue).toHaveBeenCalledWith('cool')
  })

  it('`loading` prop', async () => {
    const wrapper = mount(NInput)
    expect(wrapper.find('.n-input__suffix').exists()).toBe(false)
    expect(wrapper.find('.n-base-loading__icon').exists()).toBe(false)
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.n-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-base-loading__icon').exists()).toBe(false)
    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.n-base-loading__icon').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(NInput)
    expect(wrapper.find('.n-base-clear').exists()).not.toBe(true)
    await wrapper.setProps({
      clearable: true
    })
    expect(wrapper.find('.n-base-clear').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NInput)
    expect(wrapper.find('.n-input').classes()).not.toContain(
      'n-input--disabled'
    )
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.n-input').classes()).toContain('n-input--disabled')
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NInput)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Please Input')
    await wrapper.setProps({
      placeholder: 'test-placeholder'
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `readonly` prop', async () => {
    const wrapper = mount(NInput)
    expect(wrapper.find('input').attributes('readonly')).not.toBe('')

    await wrapper.setProps({ readonly: true })
    expect(wrapper.find('input').attributes('readonly')).toBe('')
    wrapper.unmount()
  })

  it('should work with `round` prop', async () => {
    const wrapper = mount(NInput)
    expect(wrapper.find('.n-input').classes()).not.toContain('n-input--round')

    await wrapper.setProps({ round: true })
    expect(wrapper.find('.n-input').classes()).toContain('n-input--round')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(NInput, { props: { size: size } })
      expect(wrapper.find('.n-input').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NInput)
    await wrapper.setProps({ type: 'text' })
    expect(wrapper.find('input').exists()).toBe(true)

    await wrapper.setProps({ type: 'textarea' })
    expect(wrapper.find('.n-input').classes()).toContain('n-input--textarea')
    expect(wrapper.find('textarea').exists()).toBe(true)
  })
})
