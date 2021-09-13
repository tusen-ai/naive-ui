import { mount } from '@vue/test-utils'
import { NAnchor, NAnchorLink } from '../index'
import { h } from 'vue'

describe('n-anchor', () => {
  it('should work with import on demand', () => {
    mount(NAnchor)
  })

  it('should work with `showRail` prop', () => {
    const wrapper = mount(NAnchor, {
      props: {
        showRail: true
      }
    })

    expect(wrapper.find('.n-anchor-rail').exists()).toBe(true)
  })

  it('should work with `affix` prop', () => {
    const wrapper = mount(NAnchor, {
      props: {
        affix: true
      }
    })

    expect(wrapper.find('.n-affix').exists()).toBe(true)
  })

  it('should work with `title` and `href` prop', async () => {
    const wrapper = mount(NAnchor, {
      props: {
        showRail: false
      },
      slots: {
        default: () => {
          return h(NAnchorLink, {
            title: 'testTitle',
            href: '#testHref'
          })
        }
      }
    })

    expect(wrapper.find('.n-anchor-link__title').attributes('href')).toBe(
      '#testHref'
    )
    expect(wrapper.find('.n-anchor-link__title').attributes('title')).toBe(
      'testTitle'
    )
  })
})
