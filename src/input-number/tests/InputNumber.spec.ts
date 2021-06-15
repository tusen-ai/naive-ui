import { mount } from '@vue/test-utils'
import { NInputNumber } from '../index'
import { NButton } from '../../button'

describe('n-input-number', () => {
  it('should work with import on demand', () => {
    mount(NInputNumber)
  })
})

describe('n-input-number', () => {
  it('should work with `show-button` props', async () => {
    const wrapper = mount(NInputNumber)
    expect(wrapper.findComponent(NButton).exists()).toBe(true)

    await wrapper.setProps({ showButton: false })
    expect(wrapper.findComponent(NButton).exists()).toBe(false)
  })
})
