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
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 5, color: 'grey' } })
    expect(wrapper.find('.n-badge').attributes('style')).toContain(
      '--color: grey;'
    )
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
  })

  it('should work with `processing` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 5 } })
    expect(wrapper.find('.n-base-wave').exists()).not.toBe(true)

    await wrapper.setProps({ processing: true })
    expect(wrapper.find('.n-base-wave').exists()).toBe(true)
  })

  it('should work with `show-zero` prop', async () => {
    const wrapper = mount(NBadge, { props: { value: 0 } })
    expect(wrapper.find('.n-badge-sup').exists()).not.toBe(true)

    await wrapper.setProps({ 'show-zero': true })
    expect(wrapper.find('.n-badge-sup').exists()).toBe(true)
  })
})
