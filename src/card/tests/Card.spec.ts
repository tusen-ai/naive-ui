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
    expect(wrapper.find('.n-card-header__main').element.textContent).toBe(
      'test'
    )
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NCard)

    await wrapper.setProps({ size: 'small' })
    const smallStyle = [
      '--padding-top: 12px; --padding-bottom: 12px; --padding-left: 16px;',
      '--title-font-size: 16px;'
    ]
    let cardStyle = wrapper.find('.n-card').attributes('style')
    expect(smallStyle.every((i) => cardStyle.includes(i))).toBe(true)

    await wrapper.setProps({ size: 'medium' })
    const mediumStyle = [
      '--padding-top: 19px; --padding-bottom: 20px; --padding-left: 24px;',
      '--title-font-size: 18px;'
    ]
    cardStyle = wrapper.find('.n-card').attributes('style')
    expect(mediumStyle.every((i) => cardStyle.includes(i))).toBe(true)

    await wrapper.setProps({ size: 'large' })
    const largeStyle = [
      '--padding-top: 23px; --padding-bottom: 24px; --padding-left: 32px;',
      '--title-font-size: 18px;'
    ]
    cardStyle = wrapper.find('.n-card').attributes('style')
    expect(largeStyle.every((i) => cardStyle.includes(i))).toBe(true)

    await wrapper.setProps({ size: 'huge' })
    const hugeStyle = [
      '--padding-top: 27px; --padding-bottom: 28px; --padding-left: 40px;',
      '--title-font-size: 18px;'
    ]
    cardStyle = wrapper.find('.n-card').attributes('style')
    expect(hugeStyle.every((i) => cardStyle.includes(i))).toBe(true)
  })

  it('should work with `hoverable` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        hoverable: true
      }
    })

    expect(wrapper.find('.n-card').classes()).toContain('n-card--hoverable')
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
    expect(wrapper.find('.n-card-cover').element.textContent).toBe('cover')

    expect(wrapper.find('.n-card-header').exists()).toBe(true)
    expect(wrapper.find('.n-card-header__main').element.textContent).toBe(
      'header'
    )

    expect(wrapper.find('.n-card-header__extra').exists()).toBe(true)
    expect(wrapper.find('.n-card-header__extra').element.textContent).toBe(
      'header-extra'
    )

    expect(wrapper.find('.n-card__content').exists()).toBe(true)
    expect(wrapper.find('.n-card__content').element.textContent).toBe('content')

    expect(wrapper.find('.n-card__footer').exists()).toBe(true)
    expect(wrapper.find('.n-card__footer').element.textContent).toBe('footer')

    expect(wrapper.find('.n-card__action').exists()).toBe(true)
    expect(wrapper.find('.n-card__action').element.textContent).toBe('action')
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NCard, {
      props: {
        bordered: false
      }
    })

    expect(wrapper.find('.n-card--bordered').exists()).toBe(false)
  })

  it('should work with `closable` and `on-close` prop', async () => {
    const onClose = jest.fn()
    const wrapper = mount(NCard, {
      props: {
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.n-card-header__close').exists()).toBe(true)
    await wrapper.find('.n-card-header__close').trigger('click')
    expect(onClose).toHaveBeenCalled()
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

    expect(wrapper.find('.n-card__content').attributes('style')).toContain(
      testStyle
    )
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
  })
})
