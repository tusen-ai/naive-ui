import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NEmpty } from '../index'

describe('n-empty', () => {
  it('should work with import on demand', () => {
    mount(NEmpty)
  })

  it('should work with slots', () => {
    const wrapper = mount(NEmpty, {
      slots: {
        default: () => 'test-description',
        icon: () => 'test-icon',
        extra: () => 'test-extra'
      }
    })

    expect(wrapper.find('.n-empty__description').exists()).toBe(true)
    expect(wrapper.find('.n-empty__description').text()).toBe(
      'test-description'
    )
    expect(wrapper.find('.n-empty__icon').exists()).toBe(true)
    expect(wrapper.find('.n-empty__icon').text()).toBe('test-icon')
    expect(wrapper.find('.n-empty__extra').exists()).toBe(true)
    expect(wrapper.find('.n-empty__extra').text()).toBe('test-extra')
    wrapper.unmount()
  })
  it('should work with `description` prop', () => {
    const wrapper = mount(NEmpty, {
      props: {
        description: 'test-description'
      }
    })

    expect(wrapper.find('.n-empty__description').exists()).toBe(true)
    expect(wrapper.find('.n-empty__description').text()).toContain(
      'test-description'
    )
    wrapper.unmount()
  })

  it('should work with `show-description` prop', async () => {
    const wrapper = mount(NEmpty)
    expect(wrapper.find('.n-empty__description').exists()).toBe(true)

    await wrapper.setProps({ showDescription: false })
    expect(wrapper.find('.n-empty__description').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `show-icon` prop', async () => {
    const wrapper = mount(NEmpty)
    expect(wrapper.find('.n-empty__icon').exists()).toBe(true)

    await wrapper.setProps({ showIcon: false })
    expect(wrapper.find('.n-empty__icon').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NEmpty)

    expect(wrapper.find('.n-empty').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-empty').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-empty').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'huge' })
    expect(wrapper.find('.n-empty').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with icon slot', () => {
    const wrapper = mount(NEmpty, {
      slots: {
        icon: () => h('div', { class: 'custom-icon' }, 'Custom')
      }
    })

    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.custom-icon').text()).toBe('Custom')
    wrapper.unmount()
  })

  it('should work with `size` tiny', async () => {
    const wrapper = mount(NEmpty, {
      props: { size: 'tiny' }
    })

    expect(wrapper.find('.n-empty').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should have correct default description from locale', () => {
    const wrapper = mount(NEmpty)

    // Should show default description when no description prop is provided
    expect(wrapper.find('.n-empty__description').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should prioritize description prop over locale', () => {
    const wrapper = mount(NEmpty, {
      props: {
        description: 'Custom Description'
      }
    })

    expect(wrapper.find('.n-empty__description').text()).toContain('Custom Description')
    wrapper.unmount()
  })

  it('should not show icon when showIcon is false', () => {
    const wrapper = mount(NEmpty, {
      props: { showIcon: false }
    })

    expect(wrapper.find('.n-empty__icon').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should not show description when showDescription is false', () => {
    const wrapper = mount(NEmpty, {
      props: { showDescription: false }
    })

    expect(wrapper.find('.n-empty__description').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should render custom icon slot', () => {
    const wrapper = mount(NEmpty, {
      slots: {
        icon: () => h('svg', { class: 'custom-svg' })
      }
    })

    expect(wrapper.find('.custom-svg').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render extra slot content', () => {
    const wrapper = mount(NEmpty, {
      slots: {
        extra: () => h('button', { class: 'action-btn' }, 'Action')
      }
    })

    expect(wrapper.find('.action-btn').exists()).toBe(true)
    expect(wrapper.find('.action-btn').text()).toBe('Action')
    wrapper.unmount()
  })

  it('should have correct CSS class', () => {
    const wrapper = mount(NEmpty)

    expect(wrapper.find('.n-empty').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle empty description gracefully', () => {
    const wrapper = mount(NEmpty, {
      props: { description: '' }
    })

    expect(wrapper.find('.n-empty__description').exists()).toBe(true)
    wrapper.unmount()
  })
})
