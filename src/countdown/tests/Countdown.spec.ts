import { mount } from '@vue/test-utils'
import { NCountdown } from '../index'

describe('n-countdown', () => {
  it('should work with import on demand', () => {
    mount(NCountdown)
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NCountdown, {
      props: {
        duration: 2 * 3600 * 1000
      }
    })
    expect(wrapper.text()).toBe('02:00:00')
  })
})
