import { mount } from '@vue/test-utils'
import { NCascader } from '../index'

describe('n-cascader', () => {
  it('should work with import on demand', () => {
    mount(NCascader)
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NCascader)
    expect(wrapper.find('.n-base-selection').classes()).not.toContain(
      'n-base-selection--disabled'
    )

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-base-selection').classes()).toContain(
      'n-base-selection--disabled'
    )
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(NCascader, { props: { size: i } })
      expect(
        wrapper.find('.n-base-selection').attributes('style')
      ).toMatchSnapshot()
    })
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NCascader, {
      props: { placeholder: 'test-placeholder' }
    })
    expect(wrapper.find('.n-base-selection-placeholder').text()).toBe(
      'test-placeholder'
    )
  })
})
