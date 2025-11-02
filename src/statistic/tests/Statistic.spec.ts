import { mount } from '@vue/test-utils'
import { NStatistic } from '../index'

describe('n-statistic', () => {
  it('should work with import on demand', () => {
    mount(NStatistic)
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(NStatistic, { props: { label: 'test' } })

    expect(wrapper.find('.n-statistic__label').exists()).toBe(true)
    expect(wrapper.find('.n-statistic__label').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NStatistic, { props: { value: 'test' } })

    expect(wrapper.find('.n-statistic-value__content').exists()).toBe(true)
    expect(wrapper.find('.n-statistic-value__content').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `tabularNums` prop', async () => {
    const wrapper = mount(NStatistic, {
      props: {
        value: 10001
      }
    })

    expect(wrapper.find('.n-statistic-value').attributes('style')).toBeFalsy()
    await wrapper.setProps({ tabularNums: true })
    expect(wrapper.find('.n-statistic-value').attributes('style')).toContain(
      'font-variant-numeric: tabular-nums;'
    )
    wrapper.unmount()
  })

  it('should work with `default` slot', async () => {
    const wrapper = mount(NStatistic, { slots: { default: () => 'test' } })

    expect(wrapper.find('.n-statistic-value__content').exists()).toBe(true)
    expect(wrapper.find('.n-statistic-value__content').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `label` slot', async () => {
    const wrapper = mount(NStatistic, { slots: { label: () => 'test' } })

    expect(wrapper.find('.n-statistic__label').exists()).toBe(true)
    expect(wrapper.find('.n-statistic__label').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `prefix` slot', async () => {
    const wrapper = mount(NStatistic, { slots: { prefix: () => 'test' } })

    expect(wrapper.find('.n-statistic-value__prefix').exists()).toBe(true)
    expect(wrapper.find('.n-statistic-value__prefix').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `suffix` slot', async () => {
    const wrapper = mount(NStatistic, { slots: { suffix: () => 'test' } })

    expect(wrapper.find('.n-statistic-value__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-statistic-value__suffix').text()).toBe('test')
    wrapper.unmount()
  })
})
