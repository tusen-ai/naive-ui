import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NSelect, SelectProps } from '../index'
import { NInternalSelection, NInternalSelectMenu } from '../../_internal'

describe('n-select', () => {
  it('should work with import on demand', () => {
    mount(NSelect)
  })
  it('show menu when trigger clicked', async () => {
    const wrapper = mount(NSelect)
    const inputWrapper = wrapper.findComponent(NInternalSelection)
    expect(wrapper.findComponent(NInternalSelectMenu).exists()).toEqual(false)
    await inputWrapper.trigger('click')
    expect(wrapper.findComponent(NInternalSelectMenu).isVisible()).toEqual(true)
    await inputWrapper.trigger('click')
    expect(wrapper.findComponent(NInternalSelectMenu).isVisible()).toEqual(
      false
    )
  })
  it('props.show', () => {
    const wrapper = mount(NSelect, {
      props: {
        show: true
      }
    })
    expect(wrapper.findComponent(NInternalSelectMenu).exists()).toEqual(true)
  })
  describe('props.option', () => {
    it('has correct type', () => {
      const options: SelectProps['options'] = [
        {
          label: 'cool1',
          value: 'cool1'
        },
        {
          type: 'group',
          label: 'cool',
          key: 'group cool',
          children: [
            {
              label: 'cool2',
              value: 'cool2'
            }
          ]
        }
      ]
      mount(() => <NSelect options={options} />).unmount()
    })
    it('renderLabel', () => {
      const options: SelectProps['options'] = [
        {
          label: 'cool1',
          value: 'cool1',
          renderLabel: () => 'cool1+1'
        },
        {
          type: 'group',
          label: 'cool',
          key: 'group cool',
          renderLabel: () => 'cool1+2',
          children: [
            {
              label: 'cool2',
              value: 'cool2',
              renderLabel: () => 'cool1+3'
            }
          ]
        }
      ]
      const wrapper = mount(NSelect, {
        props: {
          options,
          show: true,
          virtualScroll: false
        }
      })
      const menuWrapper = wrapper.findComponent(NInternalSelectMenu)
      expect(
        ['cool1+1', 'cool1+2', 'cool1+3'].every((label) =>
          menuWrapper.text().includes(label)
        )
      ).toEqual(true)
    })
  })
})
