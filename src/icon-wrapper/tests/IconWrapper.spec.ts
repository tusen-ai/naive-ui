import { mount } from '@vue/test-utils'
import { NIconWrapper } from '../index'

describe('n-icon-wrapper', () => {
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

  it('should work with `color` prop', async () => {
    const wrapper = mount(NIconWrapper)
    expect(wrapper.find('.n-icon-wrapper').attributes('style')).not.toContain(
      'background-color: red'
    )

    await wrapper.setProps({ color: 'red' })
    expect(wrapper.find('.n-icon-wrapper').attributes('style')).toContain(
      'background-color: red'
    )
    wrapper.unmount()
  })

  it('should work with `icon-color` prop', async () => {
    const wrapper = mount(NIconWrapper)
    expect(wrapper.find('.n-icon-wrapper').attributes('style')).not.toContain(
      'color: red'
    )

    await wrapper.setProps({ iconColor: 'red' })
    expect(wrapper.find('.n-icon-wrapper').attributes('style')).toContain(
      'color: red'
    )
    wrapper.unmount()
  })
})
