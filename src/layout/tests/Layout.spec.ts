import { h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider
} from '../index'
import { NH2 } from '../../typography'
import { NCard } from '../../card'

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
    wrapper.unmount()
  })

  it('should work with `content-style` prop', async () => {
    const wrapper = mount(NLayout, {
      props: {
        'has-sider': true
      },
      slots: {
        default: () =>
          h(
            NLayoutSider,
            { 'content-style': 'padding: 24px' },
            {
              default: () => [
                h(NH2, null, { default: () => 'test1' }),
                h(NH2, null, { default: () => 'test2' })
              ]
            }
          )
      }
    })
    expect(
      wrapper.find('.n-layout-sider-scroll-container').attributes('style')
    ).toContain('padding: 24px')
    wrapper.unmount()
  })

  it('should work with `embedded` prop', async () => {
    const wrapper = mount(NLayout, {
      props: {
        embedded: true
      },
      slots: {
        default: () =>
          h(NCard, null, {
            default: () => 'test'
          })
      }
    })
    expect(wrapper.find('.n-layout').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NLayout, {
      props: {
        'has-sider': true
      },
      slots: {
        default: () => [
          h(
            NLayoutHeader,
            { bordered: true },
            { default: () => 'test-header' }
          ),
          h(NLayoutSider, { bordered: true }, { default: () => 'test-sider' }),
          h(NLayoutFooter, { bordered: true }, { default: () => 'test-footer' })
        ]
      }
    })
    expect(wrapper.find('.n-layout-header').classes()).toContain(
      'n-layout-header--bordered'
    )
    expect(wrapper.find('.n-layout-sider').classes()).toContain(
      'n-layout-sider--bordered'
    )
    expect(wrapper.find('.n-layout-footer').classes()).toContain(
      'n-layout-footer--bordered'
    )
    wrapper.unmount()
  })

  it('should work with `inverted` prop', async () => {
    const wrapper = mount(NLayout, {
      props: {
        'has-sider': true
      },
      slots: {
        default: () => [
          h(
            NLayoutHeader,
            { inverted: true },
            { default: () => 'test-header' }
          ),
          h(NLayoutSider, { inverted: true }, { default: () => 'test-sider' }),
          h(NLayoutFooter, { inverted: true }, { default: () => 'test-footer' })
        ]
      }
    })
    expect(
      wrapper.find('.n-layout-header').attributes('style')
    ).toMatchSnapshot()
    expect(
      wrapper.find('.n-layout-sider').attributes('style')
    ).toMatchSnapshot()
    expect(
      wrapper.find('.n-layout-footer').attributes('style')
    ).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `position` prop', async () => {
    let wrapper = mount(NLayout, {
      slots: {
        default: () => [
          h(NLayoutHeader, null, { default: () => 'test-header' })
        ]
      }
    })
    expect(wrapper.find('.n-layout').classes()).toContain(
      'n-layout--static-positioned'
    )
    wrapper = mount(NLayout, {
      props: {
        position: 'absolute'
      },
      slots: {
        default: () => [
          h(NLayoutHeader, null, { default: () => 'test-header' })
        ]
      }
    })
    expect(wrapper.find('.n-layout').classes()).toContain(
      'n-layout--absolute-positioned'
    )
    wrapper.unmount()
  })

  it('should work with `sider-placement` prop', async () => {
    const wrapper = mount(NLayout, {
      props: {
        hasSider: true
      },
      slots: {
        default: () => [
          h(NLayoutSider, null, { default: () => 'test-sider' }),
          h(NLayoutContent, null, { default: () => 'test-footer' })
        ]
      }
    })
    expect(wrapper.find('.n-layout-sider').classes()).toContain(
      'n-layout-sider--left-placement'
    )

    await wrapper.setProps({ siderPlacement: 'right' })
    expect(wrapper.find('.n-layout-sider').classes()).toContain(
      'n-layout-sider--right-placement'
    )
    wrapper.unmount()
  })
})
