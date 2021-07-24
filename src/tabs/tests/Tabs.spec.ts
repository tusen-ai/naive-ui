import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NTabPane, NTabs } from '../index'

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

  it('should work with scrolling operation', async () => {
    // not support
  })

  it('should work with `default-value` prop', async () => {
    const wrapper = mount({
      components: {
        'n-tabs': NTabs,
        'n-tab-pane': NTabPane
      },
      data () {
        return {
          defaultValue: 'b'
        }
      },
      template: `
        <n-tabs :default-value="defaultValue" >
          <n-tab-pane name="a" tab="1"> a </n-tab-pane>
          <n-tab-pane name="b" tab="2"> b </n-tab-pane>
          <n-tab-pane name="c" tab="3"> c </n-tab-pane>
        </n-tabs>
      `
    })
    const tabItems = wrapper.findAll('.n-tabs-tab')

    expect(tabItems[1].classes('n-tabs-tab--active')).toBe(true)

    await tabItems[0].trigger('click')

    expect(tabItems[1].classes('n-tabs-tab--active')).toBe(false)
    expect(tabItems[0].classes('n-tabs-tab--active')).toBe(true)
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount({
      components: {
        'n-tabs': NTabs,
        'n-tab-pane': NTabPane
      },
      template: `
        <n-tabs >
          <n-tab-pane name="a" tab="1"> a </n-tab-pane>
          <n-tab-pane name="b" tab="2"> b </n-tab-pane>
          <n-tab-pane name="c" tab="3"> c </n-tab-pane>
        </n-tabs>
      `
    })

    expect(wrapper.find('.n-tabs').classes('n-tabs--bar-type')).toBe(true)

    await wrapper.setProps({ type: 'line' })
    expect(wrapper.find('.n-tabs').classes('n-tabs--line-type')).toBe(true)

    await wrapper.setProps({ type: 'card' })
    expect(wrapper.find('.n-tabs').classes('n-tabs--card-type')).toBe(true)
  })
})
