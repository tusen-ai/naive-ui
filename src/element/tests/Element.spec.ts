import { mount } from '@vue/test-utils'
import { NElement } from '../index'

describe('n-element', () => {
  it('should work with import on demand', () => {
    mount(NElement)
  })
  it('should work with `tag` prop', () => {
    const wrapper = mount(NElement, {
      props: {
        tag: 'span'
      },
      slots: {
        default: () => 'element'
      }
    })
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('element')
    wrapper.unmount()
  })
})
