import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NList, NListItem } from '../index'

describe('n-list', () => {
  it('should work with import on demand', () => {
    mount(NList)
  })

  it('should work with n-list slots', async () => {
    const wrapper = mount(NList, {
      slots: {
        default: () => 'test default',
        header: () => 'test header',
        footer: () => 'test footer'
      }
    })
    expect(wrapper.text()).toContain('test default')
    expect(wrapper.find('.n-list__header').exists()).toBe(true)
    expect(wrapper.find('.n-list__header').text()).toBe('test header')
    expect(wrapper.find('.n-list__footer').exists()).toBe(true)
    expect(wrapper.find('.n-list__footer').text()).toBe('test footer')
    wrapper.unmount()
  })

  it('should work with n-list-item slots', async () => {
    const wrapper = mount(NList, {
      slots: {
        default: () =>
          h(NListItem, null, {
            default: () => 'test default',
            prefix: () => 'test prefix',
            suffix: () => 'test suffix'
          })
      }
    })
    expect(wrapper.find('.n-list-item__main').exists()).toBe(true)
    expect(wrapper.find('.n-list-item__main').text()).toBe('test default')
    expect(wrapper.find('.n-list-item__prefix').exists()).toBe(true)
    expect(wrapper.find('.n-list-item__prefix').text()).toBe('test prefix')
    expect(wrapper.find('.n-list-item__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-list-item__suffix').text()).toBe('test suffix')
    wrapper.unmount()
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NList, {
      slots: {
        default: () =>
          h(NListItem, null, {
            default: () => 'test'
          })
      }
    })
    expect(wrapper.find('.n-list').classes()).not.toContain('n-list--bordered')

    await wrapper.setProps({ bordered: true })
    expect(wrapper.find('.n-list').classes()).toContain('n-list--bordered')
    wrapper.unmount()
  })
})
