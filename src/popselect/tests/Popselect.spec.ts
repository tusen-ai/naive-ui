import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NPopselect } from '../index'
import { NScrollbar } from '../../_internal'

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
})
