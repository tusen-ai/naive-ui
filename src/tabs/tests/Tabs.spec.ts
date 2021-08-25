import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NTabPane, NTabs } from '../index'
import { AddIcon } from '../../_internal/icons'

describe('n-tabs', () => {
  it('should work with import on demand', () => {
    mount(NTabs)
  })
  it('should work with callback types', () => {
    function onUpdateValue1 (name: number): void {}
    function onUpdateValue2 (name: string): void {}
    function onUpdateValue3 (name: number | string): void {}
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue1
      }
    })
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue2
      }
    })
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue3
      }
    })
  })
  it('should work with empty tab-pane', () => {
    mount(NTabs, {
      props: {
        defaultValue: 'a'
      },
      slots: {
        default: () =>
          h(NTabPane, {
            tab: 'a',
            name: 'a'
          })
      }
    })
  })

  it('should show AddIcon with `addable` prop', () => {
    const wrapper = mount(NTabs, {
      props: {
        type: 'card',
        addable: true
      }
    })

    expect(wrapper.findComponent(AddIcon).exists()).toBe(true)
  })

  it('should work with `justify-content` prop', async () => {
    const wrapper = mount(NTabs, {
      props: {
        defaultValue: 'a'
      }
    })

    await wrapper.setProps({ justifyContent: 'space-between' })
    expect(
      wrapper.find('.n-tabs-wrapper').attributes('style')
    ).toMatchSnapshot()

    await wrapper.setProps({ justifyContent: 'space-around' })
    expect(
      wrapper.find('.n-tabs-wrapper').attributes('style')
    ).toMatchSnapshot()

    await wrapper.setProps({ justifyContent: 'space-evenly' })
    expect(
      wrapper.find('.n-tabs-wrapper').attributes('style')
    ).toMatchSnapshot()
  })
})
