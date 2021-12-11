import { mount } from '@vue/test-utils'
import { NNumericAnimation } from '../index'

describe('n-numeric-animation', () => {
  it('should work with import on demand', () => {
    mount(NNumericAnimation)
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(NNumericAnimation, { props: { label: 'test' } })

    expect(wrapper.find('.n-numeric-animation__label').exists()).toBe(true)
    expect(wrapper.find('.n-numeric-animation').text()).toBe('test')
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NNumericAnimation, { props: { value: 110 } })

    expect(wrapper.find('.n-numeric-animation-value__content').exists()).toBe(
      true
    )
    expect(wrapper.find('.n-numeric-animation-value__content').text()).toBe(
      '110'
    )
  })

  it('should work with `label` slot', async () => {
    const wrapper = mount(NNumericAnimation, { slots: { label: () => 'test' } })

    expect(wrapper.find('.n-numeric-animation').exists()).toBe(true)
    expect(wrapper.find('.n-numeric-animation').text()).toBe('test')
  })

  it('should work with `prefix` slot', async () => {
    const wrapper = mount(NNumericAnimation, {
      slots: { prefix: () => 'test' }
    })

    expect(wrapper.find('.n-numeric-animation-value__prefix').exists()).toBe(
      true
    )
    expect(wrapper.find('.n-numeric-animation-value__prefix').text()).toBe(
      'test'
    )
  })

  it('should work with `suffix` slot', async () => {
    const wrapper = mount(NNumericAnimation, {
      slots: { suffix: () => 'test' }
    })

    expect(wrapper.find('.n-numeric-animation-value__suffix').exists()).toBe(
      true
    )
    expect(wrapper.find('.n-numeric-animation-value__suffix').text()).toBe(
      'test'
    )
  })
})
