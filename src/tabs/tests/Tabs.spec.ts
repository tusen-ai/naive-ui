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
})
