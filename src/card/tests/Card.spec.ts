import { mount } from '@vue/test-utils'
import { NCard } from '../index'

describe('n-card', () => {
  it('should work with import on demand', () => {
    mount(NCard)
  })

  it('should work with `title` prop', async () => {
    const wrapper = mount(NCard)

    expect(wrapper.find('.n-card-header').exists()).toBe(false)

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.n-card-header').exists()).toBe(true)
    expect(wrapper.find('.n-card-header__main').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NCard)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-card').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `hoverable` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        hoverable: true
      }
    })

    expect(wrapper.find('.n-card').classes()).toContain('n-card--hoverable')
    wrapper.unmount()
  })

  it('should work with `embedded` prop', async () => {
    const wrapper = mount(NCard)

    expect(wrapper.find('.n-card').attributes('style')).toContain(
      '--n-color: #fff'
    )
    await wrapper.setProps({ embedded: true })
    expect(wrapper.find('.n-card').attributes('style')).toContain(
      '--n-color-embedded: rgb(250, 250, 252)'
    )
    wrapper.unmount()
  })

  it('should work with `segmented` prop', async () => {
    const wrapper = mount(NCard)
    expect(wrapper.find('.n-card').classes()).not.toContain(
      'n-card--content-segmented'
    )

    await wrapper.setProps({
      segmented: {
        content: true,
        footer: 'soft'
      }
    })
    expect(wrapper.find('.n-card').classes()).toContain(
      'n-card--content-segmented'
    )
    wrapper.unmount()
  })

  it('should work with `slots` ', async () => {
    const wrapper = mount(NCard, {
      slots: {
        cover: () => 'cover',
        header: () => 'header',
        'header-extra': () => 'header-extra',
        default: () => 'content',
        footer: () => 'footer',
        action: () => 'action'
      }
    })

    expect(wrapper.find('.n-card-cover').exists()).toBe(true)
    expect(wrapper.find('.n-card-cover').text()).toBe('cover')

    expect(wrapper.find('.n-card-header').exists()).toBe(true)
    expect(wrapper.find('.n-card-header__main').text()).toBe('header')

    expect(wrapper.find('.n-card-header__extra').exists()).toBe(true)
    expect(wrapper.find('.n-card-header__extra').text()).toBe('header-extra')

    expect(wrapper.find('.n-card-content').exists()).toBe(true)
    expect(wrapper.find('.n-card-content').text()).toBe('content')

    expect(wrapper.find('.n-card__footer').exists()).toBe(true)
    expect(wrapper.find('.n-card__footer').text()).toBe('footer')

    expect(wrapper.find('.n-card__action').exists()).toBe(true)
    expect(wrapper.find('.n-card__action').text()).toBe('action')
    wrapper.unmount()
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        bordered: false
      }
    })

    expect(wrapper.find('.n-card--bordered').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `closable` and `on-close` prop', async () => {
    const onClose = vi.fn()
    const wrapper = mount(NCard, {
      props: {
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.n-card-header__close').exists()).toBe(true)
    await wrapper.find('.n-card-header__close').trigger('click')
    expect(onClose).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `header-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(NCard, {
      props: {
        title: 'test',
        headerStyle: testStyle
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-card-header').attributes('style')).toContain(
      testStyle
    )
    wrapper.unmount()
  })

  it('should work with `content-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(NCard, {
      props: {
        contentStyle: testStyle
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-card-content').attributes('style')).toContain(
      testStyle
    )
    wrapper.unmount()
  })

  it('should work with `footer-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(NCard, {
      props: {
        footerStyle: testStyle
      },
      slots: {
        footer: () => 'test'
      }
    })

    expect(wrapper.find('.n-card__footer').attributes('style')).toContain(
      testStyle
    )
    wrapper.unmount()
  })

  it('should work with `content-scrollable` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        contentScrollable: true
      },
      slots: {
        default: () => 'scrollable content'
      }
    })

    expect(wrapper.find('.n-card--content-scrollable').exists()).toBe(true)
    expect(wrapper.find('.n-card__content-scrollbar').exists()).toBe(true)
    expect(wrapper.find('.n-card-content').text()).toBe('scrollable content')
    wrapper.unmount()
  })

  it('should work with `header-extra-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(NCard, {
      props: {
        headerExtraStyle: testStyle
      },
      slots: {
        header: () => 'test-header',
        'header-extra': () => 'test-header-extra'
      }
    })

    expect(wrapper.find('.n-card-header__extra').attributes('style')).toContain(
      testStyle
    )
    wrapper.unmount()
  })

  it('should work with `header-class` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        title: 'test',
        headerClass: 'custom-header-class'
      }
    })

    expect(wrapper.find('.n-card-header').classes()).toContain(
      'custom-header-class'
    )
    wrapper.unmount()
  })

  it('should work with `content-class` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        contentClass: 'custom-content-class'
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-card-content').classes()).toContain(
      'custom-content-class'
    )
    wrapper.unmount()
  })

  it('should work with `footer-class` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        footerClass: 'custom-footer-class'
      },
      slots: {
        footer: () => 'test'
      }
    })

    expect(wrapper.find('.n-card__footer').classes()).toContain(
      'custom-footer-class'
    )
    wrapper.unmount()
  })

  it('should work with `header-extra-class` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        headerExtraClass: 'custom-extra-class'
      },
      slots: {
        header: () => 'header',
        'header-extra': () => 'extra'
      }
    })

    expect(wrapper.find('.n-card-header__extra').classes()).toContain(
      'custom-extra-class'
    )
    wrapper.unmount()
  })

  it('should work with `content` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        content: 'prop content'
      }
    })

    expect(wrapper.find('.n-card-content').text()).toBe('prop content')
    wrapper.unmount()
  })

  it('should work with `tag` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        tag: 'section'
      }
    })

    expect(wrapper.find('section.n-card').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `role` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        role: 'article'
      }
    })

    expect(wrapper.find('.n-card').attributes('role')).toBe('article')
    wrapper.unmount()
  })

  it('should work with `clickable` prop', async () => {
    const onClick = vi.fn()
    const wrapper = mount(NCard, {
      props: {
        clickable: true,
        onClick
      }
    })

    await wrapper.find('.n-card').trigger('click')
    expect(onClick).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `close-focusable` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        closable: true,
        closeFocusable: false
      }
    })

    const closeBtn = wrapper.find('.n-card-header__close')
    expect(closeBtn.exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with segmented as boolean', async () => {
    const wrapper = mount(NCard, {
      props: {
        segmented: true
      }
    })

    expect(wrapper.find('.n-card').classes()).toContain(
      'n-card--content-segmented'
    )
    wrapper.unmount()
  })

  it('should work with segmented footer', async () => {
    const wrapper = mount(NCard, {
      props: {
        segmented: {
          footer: true
        }
      },
      slots: {
        footer: () => 'footer'
      }
    })

    expect(wrapper.find('.n-card').classes()).toContain(
      'n-card--footer-segmented'
    )
    wrapper.unmount()
  })

  it('should work with segmented action', async () => {
    const wrapper = mount(NCard, {
      props: {
        segmented: {
          action: true
        }
      },
      slots: {
        action: () => 'action'
      }
    })

    expect(wrapper.find('.n-card').classes()).toContain(
      'n-card--action-segmented'
    )
    wrapper.unmount()
  })
})
