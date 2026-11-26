import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { NScrollbar } from '../../_internal'
import { NPopselect } from '../index'

describe('n-popselect', () => {
  it('should work with import on demand', () => {
    mount(NPopselect, {
      slots: {
        default: () => 'star kirby'
      }
    })
  })

  it('should be active after clicked and options `disabled`', async () => {
    const wrapper = mount(NPopselect, {
      attachTo: document.body,
      props: {
        trigger: 'click',
        value: '',
        options: [
          { label: 'Drive My Car', value: 'Drive My Car' },
          { label: 'Norwegian Wood', value: 'Norwegian Wood' },
          { label: 'Nowhere Man', value: 'Nowhere Man', disabled: true }
        ]
      },
      slots: {
        default: () => h('button', { class: 'test-btn' }, '点击打开')
      }
    })

    await wrapper.find('.test-btn').trigger('click')
    expect(
      document.querySelector('.n-base-select-option--disabled')?.textContent
    ).toBe('Nowhere Man')
    expect(document.querySelector('.n-base-select-menu')).not.toEqual(null)

    await wrapper.find('.test-btn').trigger('click')
    expect(document.querySelector('.n-base-select-menu')).toEqual(null)

    wrapper.unmount()
  })

  it('should work with `multiple` and `scrollable` prop', async () => {
    const wrapper = mount(NPopselect, {
      attachTo: document.body,
      props: {
        multiple: true,
        trigger: 'click',
        value: '',
        options: [
          { label: 'Drive My Car', value: 'Drive My Car' },
          { label: 'Norwegian Wood', value: 'Norwegian Wood' },
          { label: 'Nowhere Man', value: 'Nowhere Man' }
        ]
      },
      slots: {
        default: () => h('button', { class: 'test-btn' }, '点击打开')
      }
    })

    await wrapper.find('.test-btn').trigger('click')
    expect(document.querySelector('.n-base-select-menu--multiple')).not.toEqual(
      null
    )

    await wrapper.setProps({ scrollable: true })
    expect(wrapper.findComponent(NScrollbar).exists()).not.toEqual(null)

    wrapper.unmount()
  })

  it('should call a native `mousedown` listener on the menu', async () => {
    const onMousedown = vi.fn()
    const errorHandler = vi.fn()
    const wrapper = mount(NPopselect, {
      attachTo: document.body,
      props: { show: true, options: [{ label: 'label', value: 'value' }] },
      attrs: { onMousedown },
      slots: { default: () => h('button') },
      global: { config: { errorHandler } }
    })
    await nextTick()

    document
      .querySelector('.n-base-select-menu')
      ?.dispatchEvent(new MouseEvent('mousedown'))
    expect(onMousedown).toHaveBeenCalledTimes(1)
    expect(errorHandler).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should call native `mouseleave` listeners on the menu', async () => {
    const onMouseenter = vi.fn()
    const onMouseleave = vi.fn()
    const wrapper = mount(NPopselect, {
      attachTo: document.body,
      props: { show: true, options: [{ label: 'label', value: 'value' }] },
      attrs: { onMouseenter, onMouseleave },
      slots: { default: () => h('button') }
    })
    await nextTick()

    document
      .querySelector('.n-base-select-menu')
      ?.dispatchEvent(new MouseEvent('mouseleave'))
    expect(onMouseleave).toHaveBeenCalledTimes(1)
    expect(onMouseenter).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
