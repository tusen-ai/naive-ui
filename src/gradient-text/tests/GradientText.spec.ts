import { mount } from '@vue/test-utils'
import { NGradientText } from '../index'

describe('n-gradient-text', () => {
  it('should work with import on demand', () => {
    mount(NGradientText)
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NGradientText, { slots: { default: () => 'test' } })
    expect(wrapper.find('.n-gradient-text').text()).toContain('test')

    await wrapper.setProps({ type: 'danger' })
    expect(wrapper.find('.n-gradient-text').classes()).toContain(
      'n-gradient-text--error-type'
    )
    wrapper.unmount()

    const typeArray = [
      'error',
      'info',
      'warning',
      'success',
      'primary'
    ] as const
    typeArray.forEach((item) => {
      const wrapper = mount(NGradientText, {
        props: { type: item },
        slots: { default: () => 'test' }
      })
      expect(wrapper.find('.n-gradient-text').classes()).toContain(
        `n-gradient-text--${item}-type`
      )
      wrapper.unmount()
    })
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
    wrapper.unmount()
  })

  it('should work with `gradient` prop', async () => {
    const wrapper = mount(NGradientText, { slots: { default: () => 'test' } })

    await wrapper.setProps({
      gradient: { from: 'rgb(85, 85, 85)', to: 'rgb(170, 170, 170)' }
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
    wrapper.unmount()
  })
})
