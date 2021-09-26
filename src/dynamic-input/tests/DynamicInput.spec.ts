import { mount } from '@vue/test-utils'
import { NDynamicInput } from '../index'

describe('n-dynamic-input', () => {
  it('should work with import on demand', () => {
    mount(NDynamicInput)
  })

  it('should work with `value`', () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa']
      }
    })

    expect(wrapper.html()).toContain('data-key="0"')
  })
})
