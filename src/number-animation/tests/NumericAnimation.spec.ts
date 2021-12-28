import { mount } from '@vue/test-utils'
import { NNumberAnimation } from '../index'

describe('n-number-animation', () => {
  it('should work with import on demand', () => {
    mount(NNumberAnimation)
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NNumberAnimation, {
      props: { to: 110, from: 110 }
    })

    expect(wrapper.text()).toBe('110')
  })
})
