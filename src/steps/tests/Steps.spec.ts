import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NStep, NSteps } from '../index'
import { NIcon } from '../../icon'

describe('n-steps', () => {
  it('should work with import on demand', () => {
    mount(NSteps)
  })

  it('should work with `finish-icon` and `error-icon` slots', async () => {
    const wrapper = mount(NSteps, {
      props: {
        status: 'finish',
        current: 1
      },
      slots: {
        'finish-icon': () =>
          h(NIcon, null, {
            default: () => 'finish'
          }),
        'error-icon': () =>
          h(NIcon, null, {
            default: () => 'error'
          }),
        default: () =>
          h(NStep, { title: 'test', description: 'test', internalIndex: 1 })
      }
    })

    expect(wrapper.find('.n-icon').exists()).toBe(true)
    expect(wrapper.find('.n-icon').text()).toBe('finish')

    await wrapper.setProps({ status: 'error' })
    expect(wrapper.find('.n-icon').exists()).toBe(true)
    expect(wrapper.find('.n-icon').text()).toBe('error')
  })
})
