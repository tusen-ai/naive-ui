import { mount } from '@vue/test-utils'
import { NCountdown } from '../index'

describe('n-countdown', () => {
  it('should work with import on demand', () => {
    mount(NCountdown)
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(NCountdown, { props: { label: 'test' } })

    expect(wrapper.find('.n-countdown__label').exists()).toBe(true)
    expect(wrapper.find('.n-countdown__label').text()).toBe('test')
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NCountdown, {
      props: {
        value: Date.now() + 2 * 3600 * 1000,
        now: Date.now()
      }
    })
    expect(wrapper.find('.n-countdown-value__content').exists()).toBe(true)
    expect(wrapper.find('.n-countdown-value__content').text()).toBe('02:00:00')
  })

  it('should work with `label` slot', async () => {
    const wrapper = mount(NCountdown, { slots: { label: () => 'test' } })

    expect(wrapper.find('.n-countdown__label').exists()).toBe(true)
    expect(wrapper.find('.n-countdown__label').text()).toBe('test')
  })

  it('should work with `prefix` slot', async () => {
    const wrapper = mount(NCountdown, { slots: { prefix: () => 'test' } })

    expect(wrapper.find('.n-countdown-value__prefix').exists()).toBe(true)
    expect(wrapper.find('.n-countdown-value__prefix').text()).toBe('test')
  })
})
