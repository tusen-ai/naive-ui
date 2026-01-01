import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NButton } from '../../button/index'
import { NButtonGroup } from '../index'

describe('n-button-group', () => {
  it('should work with import on demand', () => {
    mount(NButtonGroup)
  })

  it('should work with `button group`', async () => {
    const wrapper = mount(NButtonGroup, {
      slots: {
        default: () => [
          h(NButton, null, {
            default: () => 'test1'
          }),
          h(NButton, null, {
            default: () => 'test2'
          }),
          h(NButton, null, {
            default: () => 'test3'
          })
        ]
      }
    })

    expect(wrapper.find('[role="group"]').classes()).toContain('n-button-group')
    expect(wrapper.findAll('button').length).toBe(3)

    await wrapper.setProps({ vertical: true })
    expect(wrapper.find('[role="group"]').classes()).toContain(
      'n-button-group--vertical'
    )
    wrapper.unmount()
  })
})
