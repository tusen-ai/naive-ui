import { mount } from '@vue/test-utils'
import { NBadge } from '../index'

describe('n-badge', () => {
  it('should work with import on demand', () => {
    mount(NBadge)
  })

  it('should work with `dot` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 5 } })
    expect(wrapper.find('.n-badge').classes('n-badge--dot')).not.toBe(true)
    expect(wrapper.find('.n-base-slot-machine').exists()).toBe(true)

    await wrapper.setProps({ dot: true })
    expect(wrapper.find('.n-badge').classes('n-badge--dot')).toBe(true)
    expect(wrapper.find('.n-base-slot-machine').exists()).not.toBe(true)
    wrapper.unmount()
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 5, color: 'grey' } })
    expect(wrapper.find('.n-badge').attributes('style')).toContain(
      '--n-color: grey;'
    )
    wrapper.unmount()
  })

  it('should work with `max` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 5, max: 5 } })
    expect(
      wrapper
        .find('.n-base-slot-machine-current-number__inner--not-number')
        .exists()
    ).not.toBe(true)

    await wrapper.setProps({ value: 6 })
    expect(
      wrapper
        .find('.n-base-slot-machine-current-number__inner--not-number')
        .exists()
    ).toBe(true)
    wrapper.unmount()
  })

  it('should work with `processing` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 5 } })
    expect(wrapper.find('.n-base-wave').exists()).not.toBe(true)

    await wrapper.setProps({ processing: true })
    expect(wrapper.find('.n-base-wave').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `show-zero` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 0 } })
    expect(wrapper.find('.n-badge-sup').exists()).not.toBe(true)

    await wrapper.setProps({ 'show-zero': true })
    expect(wrapper.find('.n-badge-sup').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `show` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 7 } })
    expect(wrapper.find('.n-badge-sup').exists()).toBe(true)

    await wrapper.setProps({ show: false })
    expect(wrapper.find('.n-badge-sup').exists()).not.toBe(true)
    wrapper.unmount()
  })

  it('should work with `type` prop', () => {
    const data = [
      { type: 'default', color: '#d03050' },
      { type: 'error', color: '#d03050' },
      { type: 'info', color: '#2080f0' },
      { type: 'success', color: '#18a058' },
      { type: 'warning', color: '#f0a020' }
    ] as const

    data.forEach((item) => {
      const wrapper = mount(NBadge, {
        props: {
          type: item.type,
          value: 5
        }
      })

      expect(wrapper.find('.n-badge').attributes('style')).toContain(item.color)
      wrapper.unmount()
    })
  })
})
