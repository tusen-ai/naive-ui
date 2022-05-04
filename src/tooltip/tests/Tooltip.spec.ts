import { mount } from '@vue/test-utils'
import { NTooltip } from '../index'

describe('n-tooltip', () => {
  it('should work with import on demand', () => {
    mount(NTooltip, {
      slots: {
        trigger: () => '07akioni'
      }
    })
  })

  it('should work with `show` props', async () => {
    const wrapper = mount(NTooltip, {
      slots: {
        default: () => 'test-default',
        trigger: () => 'test-trigger'
      },
      attachTo: document.body
    })
    expect(document.querySelector('.n-tooltip')).toEqual(null)

    await wrapper.setProps({ show: true })
    expect(document.querySelector('.n-tooltip')).not.toEqual(null)
    wrapper.unmount()
  })
})
