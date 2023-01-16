import { mount } from '@vue/test-utils'
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
})
