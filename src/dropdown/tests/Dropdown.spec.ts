import { mount } from '@vue/test-utils'
import { NDropdown } from '../index'

describe('n-dropdown', () => {
  it('should work with import on demand', () => {
    mount(NDropdown, {
      slots: {
        default: () => 'star kirby'
      }
    })
  })

  it('dropdown disabled', async () => {
    const onSelect = (key: any): void => {
      expect(key).toEqual(undefined)
    }

    const options = [
      {
        label: '滨海湾金沙，新加坡',
        key: 'marina bay sands',
        disabled: true
      }
    ]
    const triggerEvent = 'click'
    const wrapper = mount(NDropdown, {
      attachTo: document.body,
      props: {
        options,
        trigger: triggerEvent,
        onSelect: onSelect
      },
      slots: {
        default: () => 'star kirby'
      }
    })

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger(triggerEvent)

    const disabledMenu = document.querySelector(
      '.n-dropdown-option-body--disabled'
    ) as HTMLDivElement

    expect(disabledMenu).not.toEqual(null)

    await disabledMenu.click()

    wrapper.unmount()
  })
})
