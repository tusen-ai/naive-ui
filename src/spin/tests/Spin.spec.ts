import { h } from '@vue/runtime-core'
import { mount } from '@vue/test-utils'
import { NSpin } from '../index'
import { Reload } from '@vicons/ionicons5'
import { NIcon } from '../../icon'

describe('n-spin', () => {
  it('should work with import on demand', () => {
    mount(NSpin)
  })
  it('should work with icon slot', () => {
    const wrapper = mount(NSpin, {
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(Reload)
          })
      }
    })

    expect(wrapper.findComponent(NIcon).exists()).toBe(true)
    expect(wrapper.findComponent(Reload).exists()).toBe(true)
  })
  it('rotate should work on icon slot', async () => {
    const wrapper = mount(NSpin, {
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(Reload)
          })
      }
    })
    expect(wrapper.find('.n-base-loading__icon-slot--rotate').exists()).toBe(
      true
    )
    await wrapper.setProps({
      rotate: false
    })
    expect(wrapper.find('.n-base-loading__icon-slot--rotate').exists()).toBe(
      false
    )
  })
})
