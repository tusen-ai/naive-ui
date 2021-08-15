import { mount } from '@vue/test-utils'
import { NRadio } from '../index'

describe('n-radio', () => {
  it('should work with import on demand', () => {
    mount(NRadio)
  })

  it('should work with `checked` prop', async () => {
    const wrapper = mount(NRadio, { props: { checked: false } })
    expect(wrapper.find('.n-radio').classes()).not.toContain('n-radio--checked')
    await wrapper.setProps({ checked: true })
    expect(wrapper.find('.n-radio').classes()).toContain('n-radio--checked')
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NRadio, { props: { disabled: false } })
    expect(wrapper.find('.n-radio').classes()).not.toContain(
      'n-radio--disabled'
    )
    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-radio').classes()).toContain('n-radio--disabled')
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NRadio, { props: { size: 'small' } })
    expect(wrapper.find('.n-radio').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-radio').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-radio').attributes('style')).toMatchSnapshot()
  })
})
