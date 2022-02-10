import { mount } from '@vue/test-utils'
import { NNumberAnimation } from '../index'

describe('n-number-animation', () => {
  it('should work with import on demand', () => {
    mount(NNumberAnimation)
  })

  it('should work with `to` prop', async () => {
    const wrapper = mount(NNumberAnimation, {
      props: { to: 110, from: 110 }
    })

    expect(wrapper.text()).toBe('110')
  })

  it('should work with `from` prop', async () => {
    const wrapper = mount(NNumberAnimation, {
      props: { to: 110, from: 10, active: false }
    })

    expect(wrapper.text()).toBe('10')
  })
})
