import { mount } from '@vue/test-utils'
import { NInput } from '../index'

describe('n-input', () => {
  it('should work with import on demand', () => {
    mount(NInput)
  })
  it('should call input callbacks', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mount(NInput, {
      props: {
        onUpdateValue
      }
    })
    wrapper.find('input').element.value = 'cool'
    await wrapper.find('input').trigger('input')
    expect(onUpdateValue).toHaveBeenCalledWith('cool')
  })
  it('`loading` prop', async () => {
    const wrapper = mount(NInput)
    expect(wrapper.find('.n-input__suffix').exists()).toBe(false)
    expect(wrapper.find('.n-base-loading__icon').exists()).toBe(false)
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.n-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-base-loading__icon').exists()).toBe(false)
    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.n-base-loading__icon').exists()).toBe(true)
    wrapper.unmount()
  })
})
