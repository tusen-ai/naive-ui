import type { TreeSelectOption } from '../index'
import { mount } from '@vue/test-utils'
import { NBaseFocusDetector } from '../../_internal'
import { NTreeSelect } from '../index'

describe('n-tree-select', () => {
  it('should work with import on demand', () => {
    mount(NTreeSelect)
  })
  it('should accept proper options', () => {
    mount(NTreeSelect, {
      props: {
        options: [
          {
            label: '1',
            key: '1'
          }
        ]
      }
    })
    const options: TreeSelectOption[] = [
      {
        label: '1',
        key: '1',
        gogogo: '12'
      }
    ]
    mount(NTreeSelect, {
      props: {
        options
      }
    })
  })
  it('should show all path when set showPath', async () => {
    const wrapper = mount(NTreeSelect, {
      props: {
        options: [
          {
            label: '1',
            key: '1',
            children: [
              {
                label: '1-1',
                key: '1-1'
              },
              {
                label: '1-2',
                key: '1-2'
              }
            ]
          }
        ],
        showPath: true,
        defaultValue: '1-2'
      }
    })
    expect(wrapper.find('.n-base-selection-input').exists()).toBe(true)
    expect(wrapper.find('.n-base-selection-input').text()).toBe('1 / 1-2')

    await wrapper.setProps({ showPath: false })
    expect(wrapper.find('.n-base-selection-input').exists()).toBe(true)
    expect(wrapper.find('.n-base-selection-input').text()).toBe('1-2')

    await wrapper.setProps({
      showPath: true,
      defaultValue: '1-1',
      separator: ' | '
    })
    expect(wrapper.find('.n-base-selection-input').exists()).toBe(true)
    expect(wrapper.find('.n-base-selection-input').text()).toBe('1 | 1-2')
  })

  it('should work with `multiple` prop', () => {
    const wrapper = mount(NTreeSelect, {
      props: {
        multiple: true,
        options: [
          {
            label: '1',
            key: '1'
          }
        ]
      }
    })
    expect(wrapper.find('.n-base-selection').attributes('class')).toContain(
      'n-base-selection--multiple'
    )
  })

  it('should not throw when focus leaves the menu', async () => {
    const errorHandler = vi.fn()
    const wrapper = mount(NTreeSelect, {
      attachTo: document.body,
      props: {
        show: true,
        options: [
          {
            label: '1',
            key: '1'
          }
        ]
      },
      global: { config: { errorHandler } }
    })
    const detector = wrapper.findComponent(NBaseFocusDetector)
    expect(detector.exists()).toBe(true)
    await detector.trigger('blur')
    expect(errorHandler).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
