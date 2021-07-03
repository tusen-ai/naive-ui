import { mount } from '@vue/test-utils'
import { NGradientText } from '../index'

describe('n-gradient-text', () => {
  it('should work with import on demand', () => {
    mount(NGradientText)
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NGradientText, { slots: { default: () => 'test' } })
    expect(wrapper.find('.n-gradient-text').text()).toContain('test')

    await wrapper.setProps({ type: 'error' })
    expect(wrapper.find('.n-gradient-text').classes()).toContain(
      'n-gradient-text--error-type'
    )

    await wrapper.setProps({ type: 'info' })
    expect(wrapper.find('.n-gradient-text').classes()).toContain(
      'n-gradient-text--info-type'
    )

    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.find('.n-gradient-text').classes()).toContain(
      'n-gradient-text--warning-type'
    )

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.find('.n-gradient-text').classes()).toContain(
      'n-gradient-text--success-type'
    )
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NGradientText, { slots: { default: () => 'test' } })
    expect(wrapper.find('.n-gradient-text').attributes('style')).not.toContain(
      'font-size'
    )

    await wrapper.setProps({ size: '24' })
    expect(wrapper.find('.n-gradient-text').attributes('style')).toContain(
      'font-size: 24px;'
    )
  })

  it('should work with `gradient` prop', async () => {
    const wrapper = mount(NGradientText, { slots: { default: () => 'test' } })

    await wrapper.setProps({
      gradient:
        "{ deg: 180, from: 'rgb(85, 85, 85)', to: 'rgb(170, 170, 170)' }"
    })
    expect(
      wrapper.find('.n-gradient-text').attributes('style')
    ).toMatchSnapshot()

    await wrapper.setProps({
      gradient: 'linear-gradient(90deg, red 0%, green 50%, blue 100%)'
    })
    expect(
      wrapper.find('.n-gradient-text').attributes('style')
    ).toMatchSnapshot()
  })
})
