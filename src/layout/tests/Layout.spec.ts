import { h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider
} from '../index'

describe('n-layout', () => {
  it('should work with import on demand', () => {
    mount(NLayout)
  })

  it('should work with Basic', async () => {
    const wrapper = mount(NLayout, {
      props: {
        'has-sider': true
      },
      slots: {
        default: () => [
          h(NLayoutHeader, null, { default: () => 'test-header' }),
          h(NLayoutContent, null, { default: () => 'test-content' }),
          h(NLayoutSider, null, { default: () => 'test-sider' }),
          h(NLayoutFooter, null, { default: () => 'test-footer' })
        ]
      }
    })
    console.log(wrapper.html())

    expect(
      wrapper.find('.n-layout-scroll-container').element.children.length
    ).toBe(4)
    expect(
      wrapper
        .find('.n-layout-scroll-container')
        .element.children[0].getAttribute('class')
    ).toContain('n-layout-header')
    expect(wrapper.find('.n-layout-header').text()).toBe('test-header')
    expect(
      wrapper
        .find('.n-layout-scroll-container')
        .element.children[1].getAttribute('class')
    ).toContain('n-layout-content')
    expect(wrapper.findAll('.n-layout-scroll-container')[1].text()).toBe(
      'test-content'
    )
    expect(
      wrapper
        .find('.n-layout-scroll-container')
        .element.children[2].getAttribute('class')
    ).toContain('n-layout-sider')
    expect(wrapper.find('.n-layout-sider-scroll-container').text()).toBe(
      'test-sider'
    )
    expect(
      wrapper
        .find('.n-layout-scroll-container')
        .element.children[3].getAttribute('class')
    ).toContain('n-layout-footer')
    expect(wrapper.find('.n-layout-footer').text()).toBe('test-footer')
  })
})
