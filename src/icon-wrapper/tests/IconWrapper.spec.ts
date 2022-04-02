import { mount } from '@vue/test-utils'
import { NIconWrapper } from '../index'

describe('n-icon', () => {
  it('should work with import on demand', () => {
    mount(NIconWrapper)
  })

  it('should work with `border-radius` prop', async () => {
    const wrapper = mount(NIconWrapper)
    expect(wrapper.find('.n-icon-wrapper').attributes('style')).toContain(
      'border-radius: 6px'
    )

    await wrapper.setProps({ borderRadius: 10 })
    expect(wrapper.find('.n-icon-wrapper').attributes('style')).toContain(
      'border-radius: 10px'
    )
    wrapper.unmount()
  })
})
