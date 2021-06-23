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
})
