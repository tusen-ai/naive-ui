import type { TreeSelectOption } from '../index'
import { mount } from '@vue/test-utils'
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
  it('should not select a node when Enter is pressed during IME composition', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(NTreeSelect, {
      props: {
        options: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          }
        ],
        show: true,
        filterable: true,
        onUpdateValue
      }
    })
    const input = wrapper.find('input')
    await input.setValue('2')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('compositionstart')
    await input.setValue('2')
    await input.trigger('keydown', { key: 'Enter' })
    expect(onUpdateValue).not.toHaveBeenCalled()
    await input.trigger('compositionend')
    await input.trigger('keydown', { key: 'Enter' })
    expect(onUpdateValue).toHaveBeenCalledTimes(1)
    expect(onUpdateValue.mock.calls[0][0]).toBe('2')
  })
})
