import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NBreadcrumb, NBreadcrumbItem } from '../index'

describe('n-breadcrumb', () => {
  it('should work with import on demand', () => {
    mount(NBreadcrumb)
  })

  it('should work with Breadcrumb, BreadcrumbItem slots', async () => {
    const wrapper = mount(NBreadcrumb, {
      slots: {
        default: () => [
          h(NBreadcrumbItem, null, { default: () => 'test-item1' }),
          h(NBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(wrapper.find('.n-breadcrumb').element.children.length).toBe(2)
    expect(
      wrapper.find('.n-breadcrumb').element.children[0].getAttribute('class')
    ).toContain('n-breadcrumb-item')
    const itemList = wrapper.findAll('.n-breadcrumb-item__link')
    expect(itemList[0].text()).toBe('test-item1')
    expect(itemList[1].text()).toBe('test-item2')
  })

  it("should work with Breadcrumb's `separator` prop", async () => {
    const wrapper = mount(NBreadcrumb, {
      props: { separator: '@' },
      slots: {
        default: () => [
          h(NBreadcrumbItem, null, { default: () => 'test-item1' }),
          h(NBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(
      wrapper
        .findAll('.n-breadcrumb-item__separator')
        .every((i) => i.text() === '@')
    ).toBe(true)
  })

  it("should work with BreadcrumbItem's `separator` prop", async () => {
    const wrapper = mount(NBreadcrumb, {
      slots: {
        default: () => [
          h(
            NBreadcrumbItem,
            { separator: '@' },
            { default: () => 'test-item1' }
          ),
          h(NBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(wrapper.findAll('.n-breadcrumb-item__separator')[0].text()).toBe('@')
    expect(wrapper.findAll('.n-breadcrumb-item__separator')[1].text()).toBe('/')
  })
})
