import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NPopselect } from '../index'

describe('n-popselect', () => {
  it('should work with import on demand', () => {
    mount(NPopselect, {
      slots: {
        default: () => 'star kirby'
      }
    })
  })

  it('should be active after clicked', async () => {
    const wrapper = mount(NPopselect, {
      attachTo: document.body,
      props: {
        trigger: 'click',
        value: '',
        options: [
          { label: 'Drive My Car', value: 'Drive My Car' },
          { label: 'Norwegian Wood', value: 'Norwegian Wood' }
        ]
      },
      slots: {
        default: () => h('button', { class: 'test-btn' }, '点击打开')
      }
    })

    await wrapper.find('.test-btn').trigger('click')
    expect(document.querySelector('.n-base-select-menu')).not.toEqual(null)

    await wrapper.find('.test-btn').trigger('click')
    expect(document.querySelector('.n-base-select-menu')).toEqual(null)

    wrapper.unmount()
  })
})
