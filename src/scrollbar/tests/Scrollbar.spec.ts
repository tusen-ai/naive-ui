import { mount } from '@vue/test-utils'
import { NScrollbar } from '../index'

describe('n-scrollbar', () => {
  it('should work with import on demand', () => {
    mount(NScrollbar)
  })

  it('should work with `default` slot', () => {
    const text = 'test-default'
    const wrapper = mount(NScrollbar, {
      attrs: { style: 'max-height: 120px' },
      slots: { default: () => text }
    })

    expect(wrapper.find('.n-scrollbar-rail').exists()).toBe(true)
    expect(wrapper.find('.n-scrollbar-content').text()).toBe(text)
    wrapper.unmount()
  })
})
