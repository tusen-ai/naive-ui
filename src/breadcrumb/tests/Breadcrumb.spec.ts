import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NBreadcrumb, NBreadcrumbItem } from '../index'
import Breadcrumb from '../src/Breadcrumb'

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

    expect(wrapper.find('ul').element.children.length).toBe(2)
    expect(
      wrapper.find('ul').element.children[0].getAttribute('class')
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

  it('should be possible to pass `href` props to NBreadcrumbItem', () => {
    const wrapper = mount(NBreadcrumb, {
      slots: {
        default: () => [
          h(NBreadcrumbItem, null, { default: () => 'Home' }),
          h(
            NBreadcrumbItem,
            { href: '/path1', isCurrent: true },
            { default: () => 'Path1' }
          )
        ]
      }
    })

    const firstBreadcrumbItem = wrapper.find('span.n-breadcrumb-item__link')
    const secondBreadcrumbItem = wrapper.find(
      'a.n-breadcrumb-item__link[aria-current="location"]'
    )

    expect(firstBreadcrumbItem.exists()).toBe(true)
    expect(firstBreadcrumbItem.text()).toMatch('Home')
    expect(secondBreadcrumbItem.exists()).toBe(true)
    expect(secondBreadcrumbItem.text()).toMatch('Path1')
  })

  describe('accessibility', () => {
    it('should labelled the landmark region', () => {
      const wrapper = mount(Breadcrumb)
      expect(wrapper.find('.n-breadcrumb').attributes('aria-label')).toBe(
        'Breadcrumb'
      )
    })
  })
})
