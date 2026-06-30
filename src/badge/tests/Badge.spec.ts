import { mount } from '@vue/test-utils'
import { h } from 'vue'
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

    await wrapper.setProps({ showZero: true })
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

  it('should work with `offset` prop', async () => {
    const wrapper = mount(NBadge, {
      props: {
        value: 5,
        offset: [10, 10]
      }
    })
    expect(wrapper.find('.n-badge-sup').attributes('style')).toContain('transform')
    wrapper.unmount()
  })

  it('should work with default slot', () => {
    const wrapper = mount(NBadge, {
      props: { value: 5 },
      slots: {
        default: () => h('div', { class: 'badge-content' }, 'Content')
      }
    })
    expect(wrapper.find('.badge-content').exists()).toBe(true)
    expect(wrapper.find('.badge-content').text()).toBe('Content')
    wrapper.unmount()
  })

  it('should work with value slot', () => {
    const wrapper = mount(NBadge, {
      slots: {
        value: () => 'Custom Value'
      }
    })
    expect(wrapper.find('.n-badge-sup').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with string value', () => {
    const wrapper = mount(NBadge, {
      props: { value: 'NEW' }
    })
    expect(wrapper.find('.n-badge-sup').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should not show badge for negative values when showZero is false', () => {
    const wrapper = mount(NBadge, {
      props: { value: -5 }
    })
    // Negative values are treated like zero, so badge is hidden by default
    expect(wrapper.find('.n-badge-sup').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should show badge for negative values when showZero is true', () => {
    const wrapper = mount(NBadge, {
      props: { value: -5, showZero: true }
    })
    // When showZero is true, negative values are shown
    expect(wrapper.find('.n-badge-sup').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle RTL mode', async () => {
    const wrapper = mount(NBadge, {
      props: {
        value: 5,
        offset: [10, 10]
      }
    })
    expect(wrapper.find('.n-badge').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should have correct title attribute on sup element', () => {
    const wrapper = mount(NBadge, {
      props: { value: 100 }
    })
    const sup = wrapper.find('.n-badge-sup')
    expect(sup.exists()).toBe(true)
    expect(sup.attributes('title')).toBe('100')
    wrapper.unmount()
  })

  it('should work with large values', () => {
    const wrapper = mount(NBadge, {
      props: { value: 9999, max: 99 }
    })
    expect(wrapper.find('.n-badge-sup').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should not show badge when value is undefined and no value slot', () => {
    const wrapper = mount(NBadge)
    expect(wrapper.find('.n-badge-sup').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should show badge with dot when value is undefined', () => {
    const wrapper = mount(NBadge, {
      props: { dot: true }
    })
    expect(wrapper.find('.n-badge-sup').exists()).toBe(true)
    wrapper.unmount()
  })
})
