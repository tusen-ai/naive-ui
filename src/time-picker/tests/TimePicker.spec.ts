import { mount } from '@vue/test-utils'
import { NTimePicker } from '../index'

describe('n-time-picker', () => {
  it('should work with import on demand', () => {
    mount(NTimePicker)
  })

  it('should work with `inputReadonly` prop', async () => {
    const wrapper = mount(NTimePicker)
    expect(wrapper.find('input').attributes('readonly')).not.toBe('')
    await wrapper.setProps({
      inputReadonly: true
    })
    expect(wrapper.find('input').attributes('readonly')).toBe('')
  })
})
