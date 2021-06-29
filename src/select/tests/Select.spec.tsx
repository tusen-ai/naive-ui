import { h, VNode } from 'vue'
import { mount } from '@vue/test-utils'
import { NSelect, SelectProps } from '../index'
import { NInternalSelection, NInternalSelectMenu } from '../../_internal'
import { SelectOption, SelectGroupOption } from '../'

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
    it('option.label as render function', () => {
      const options: SelectProps['options'] = [
        {
          label: () => 'cool1+1',
          value: 'cool1'
        },
        {
          type: 'group',
          label: () => 'cool1+2',
          key: 'group cool',
          children: [
            {
              label: () => 'cool1+3',
              value: 'cool2'
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
    it('option.render', () => {
      const options: SelectProps['options'] = [
        {
          label: 'cool1',
          value: 'cool1',
          render: ({ node, option }: { node: VNode, option: SelectOption }) => {
            expect(option.label).toEqual('cool1')
            return <div class="cool1">{node}</div>
          }
        },
        {
          type: 'group',
          label: 'cool2',
          key: 'group cool',
          render: ({
            node,
            option
          }: {
            node: VNode
            option: SelectGroupOption
          }) => {
            expect(option.label).toEqual('cool2')
            return <div class="cool2">{node}</div>
          },
          children: [
            {
              label: 'cool3',
              value: 'cool3',
              render: ({ node, option }) => {
                expect(option.label).toEqual('cool3')
                return <div class="cool3">{node}</div>
              }
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
      expect(menuWrapper.find('.cool1').exists()).toEqual(true)
      expect(menuWrapper.find('.cool2').exists()).toEqual(true)
      expect(menuWrapper.find('.cool3').exists()).toEqual(true)
      wrapper.unmount()
    })
    it('props.renderOption', () => {
      const renderOption: SelectProps['renderOption'] = ({
        node,
        option
      }: {
        node: VNode
        option: SelectOption | SelectGroupOption
      }) => <div class={option.label}>{node}</div>
      const options: SelectProps['options'] = [
        {
          label: 'cool1',
          value: 'cool1'
        },
        {
          type: 'group',
          label: 'cool2',
          key: 'group cool',
          children: [
            {
              label: 'cool3',
              value: 'cool3',
              render: ({ node, option }) => {
                expect(option.label).toEqual('cool3')
                return <div class="cool3">{node}</div>
              }
            }
          ]
        }
      ]
      const wrapper = mount(NSelect, {
        props: {
          options,
          show: true,
          virtualScroll: false,
          renderOption
        }
      })
      const menuWrapper = wrapper.findComponent(NInternalSelectMenu)
      expect(menuWrapper.find('.cool1').exists()).toEqual(true)
      expect(menuWrapper.find('.cool2').exists()).toEqual(true)
      expect(menuWrapper.find('.cool3').exists()).toEqual(true)
      wrapper.unmount()
    })
  })
})
