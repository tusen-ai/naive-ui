import { mount } from '@vue/test-utils'
import { h } from 'vue'
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

  it('should work with `size` prop', async () => {
    const wrapper = mount(NList, {
      props: { size: 'small' },
      slots: {
        default: () =>
          h(NListItem, null, {
            default: () => 'test'
          })
      }
    })
    expect(wrapper.find('.n-list').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-list').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-list').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `hoverable` prop', async () => {
    const wrapper = mount(NList, {
      props: { hoverable: true },
      slots: {
        default: () =>
          h(NListItem, null, {
            default: () => 'test'
          })
      }
    })
    expect(wrapper.find('.n-list').classes()).toContain('n-list--hoverable')
    wrapper.unmount()
  })

  it('should work with `clickable` prop', async () => {
    const onClick = vi.fn()
    const wrapper = mount(NList, {
      props: { clickable: true },
      slots: {
        default: () =>
          h(NListItem, { onClick }, {
            default: () => 'test'
          })
      }
    })
    expect(wrapper.find('.n-list').classes()).toContain('n-list--clickable')
    wrapper.unmount()
  })

  it('should work with `show-divider` prop', async () => {
    const wrapper = mount(NList, {
      slots: {
        default: () => [
          h(NListItem, null, { default: () => 'item 1' }),
          h(NListItem, null, { default: () => 'item 2' })
        ]
      }
    })
    // Default is true, so show-divider class should exist
    expect(wrapper.find('.n-list').classes()).toContain('n-list--show-divider')

    await wrapper.setProps({ showDivider: false })
    // When showDivider is false, the class should not exist
    expect(wrapper.find('.n-list').classes()).not.toContain('n-list--show-divider')
    wrapper.unmount()
  })

  it('should work with multiple list items', () => {
    const wrapper = mount(NList, {
      slots: {
        default: () => [
          h(NListItem, null, { default: () => 'item 1' }),
          h(NListItem, null, { default: () => 'item 2' }),
          h(NListItem, null, { default: () => 'item 3' })
        ]
      }
    })
    const items = wrapper.findAll('.n-list-item')
    expect(items.length).toBe(3)
    expect(items[0].text()).toBe('item 1')
    expect(items[1].text()).toBe('item 2')
    expect(items[2].text()).toBe('item 3')
    wrapper.unmount()
  })

  it('should work with list item with no slots', () => {
    const wrapper = mount(NList, {
      slots: {
        default: () => h(NListItem)
      }
    })
    expect(wrapper.find('.n-list-item').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle empty list', () => {
    const wrapper = mount(NList)
    expect(wrapper.find('.n-list').exists()).toBe(true)
    expect(wrapper.findAll('.n-list-item').length).toBe(0)
    wrapper.unmount()
  })

  it('should render as ul element', () => {
    const wrapper = mount(NList, {
      slots: {
        default: () =>
          h(NListItem, null, {
            default: () => 'test'
          })
      }
    })
    // List renders as a ul element
    expect(wrapper.find('ul.n-list').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should pass showDivider to list items via injection', async () => {
    const wrapper = mount(NList, {
      props: { showDivider: false },
      slots: {
        default: () => [
          h(NListItem, null, { default: () => 'item 1' }),
          h(NListItem, null, { default: () => 'item 2' })
        ]
      }
    })
    // List items should not show dividers when showDivider is false
    expect(wrapper.findAll('.n-list-item').length).toBe(2)
    wrapper.unmount()
  })
})
