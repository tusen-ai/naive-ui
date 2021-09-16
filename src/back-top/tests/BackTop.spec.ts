import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NBackTop } from '../index'

describe('n-back-top', () => {
  it('should work with import on demand', () => {
    mount(NBackTop)
  })

  it('should work with `show` prop', async () => {
    const wrapper = mount(NBackTop, {
      props: {
        show: true
      },
      slots: {
        default: () => {
          return h('div', {}, '返回顶部')
        }
      }
    })

    expect(wrapper.html()).toContain('teleport start')
  })
})
