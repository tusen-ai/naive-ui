import { mount } from '@vue/test-utils'
import { NThing } from '../index'

describe('n-thing', () => {
  it('should work with import on demand', () => {
    mount(NThing)
  })

  it('should work with `content`, `description`, `title-extra`, `title` props', async () => {
    const wrapper = mount(NThing, {
      props: {
        content: 'test-content',
        description: 'test-description',
        'title-extra': 'test-title-extra',
        title: 'test-title'
      }
    })

    expect(wrapper.find('.n-thing-main__content').exists()).toBe(true)
    expect(wrapper.find('.n-thing-main__content').text()).toBe('test-content')
    expect(wrapper.find('.n-thing-main__description').exists()).toBe(true)
    expect(wrapper.find('.n-thing-main__description').text()).toBe(
      'test-description'
    )
    expect(wrapper.find('.n-thing-header__title').exists()).toBe(true)
    expect(wrapper.find('.n-thing-header__title').text()).toBe('test-title')
    expect(wrapper.find('.n-thing-header__extra').exists()).toBe(true)
    expect(wrapper.find('.n-thing-header__extra').text()).toBe(
      'test-title-extra'
    )
  })

  it('should work with `content-indented` prop', async () => {
    const wrapper = mount(NThing, {
      props: {
        content: 'test-content',
        description: 'test-description',
        'title-extra': 'test-title-extra',
        title: 'test-title'
      },
      slots: { avatar: () => 'test-avatar' }
    })
    expect(wrapper.find('.n-thing').element.children.length).toBe(1)
    expect(
      wrapper.find('.n-thing').element.children[0].getAttribute('class')
    ).toContain('n-thing-main')

    await wrapper.setProps({ contentIndented: true })
    expect(wrapper.find('.n-thing').element.children.length).toBe(2)
    expect(
      wrapper.find('.n-thing').element.children[0].getAttribute('class')
    ).toContain('n-thing-avatar')
    expect(
      wrapper.find('.n-thing').element.children[1].getAttribute('class')
    ).toContain('n-thing-main')
  })

  it('should work with `avatar` `action` `default` `description` `header-extra` `header` `footer` Slots', async () => {
    const wrapper = mount(NThing, {
      slots: {
        avatar: () => 'test-avatar',
        action: () => 'test-action',
        default: () => 'test-default',
        description: () => 'test-description',
        'header-extra': () => 'test-header-extra',
        header: () => 'test-header',
        footer: () => 'test-footer'
      }
    })

    expect(wrapper.find('.n-thing-avatar').exists()).toBe(true)
    expect(wrapper.find('.n-thing-avatar').text()).toBe('test-avatar')
    expect(wrapper.find('.n-thing-main__action').exists()).toBe(true)
    expect(wrapper.find('.n-thing-main__action').text()).toBe('test-action')
    expect(wrapper.find('.n-thing-main__content').exists()).toBe(true)
    expect(wrapper.find('.n-thing-main__content').text()).toBe('test-default')
    expect(wrapper.find('.n-thing-main__description').exists()).toBe(true)
    expect(wrapper.find('.n-thing-main__description').text()).toBe(
      'test-description'
    )
    expect(wrapper.find('.n-thing-header__extra').exists()).toBe(true)
    expect(wrapper.find('.n-thing-header__extra').text()).toBe(
      'test-header-extra'
    )
    expect(wrapper.find('.n-thing-header__title').exists()).toBe(true)
    expect(wrapper.find('.n-thing-header__title').text()).toBe('test-header')
    expect(wrapper.find('.n-thing-main__footer').exists()).toBe(true)
    expect(wrapper.find('.n-thing-main__footer').text()).toBe('test-footer')
  })
})
