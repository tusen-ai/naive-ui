import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { NPopconfirm } from '../index'
import { NButton } from '../../button'

describe('n-popconfirm', () => {
  it('should work with import on demand', () => {
    mount(NPopconfirm, {
      slots: {
        trigger: () => 'star kirby'
      }
    })
  })

  it('should work with `negative-text` `positive-text`', async () => {
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        'negative-text': 'negative',
        'positive-text': 'positive'
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    expect(document.querySelectorAll('.n-button__content')[1].textContent).toBe(
      'negative'
    )
    expect(document.querySelectorAll('.n-button__content')[2].textContent).toBe(
      'positive'
    )
    wrapper.unmount()
  })

  it('should work with `show-icon` prop', async () => {
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        showIcon: false
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-popconfirm__icon')).toBe(null)
    wrapper.unmount()
  })

  it('should work with `on-positive-click` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        onPositiveClick: onClick
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    document
      .querySelectorAll('.n-button')[2]
      ?.dispatchEvent(new MouseEvent('click'))
    await nextTick()
    expect(onClick).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-negative-click` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        onNegativeClick: onClick
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    document
      .querySelectorAll('.n-button')[1]
      ?.dispatchEvent(new MouseEvent('click'))
    await nextTick()
    expect(onClick).toHaveBeenCalled()
    wrapper.unmount()
  })
})
