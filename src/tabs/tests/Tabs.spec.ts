import { mount } from '@vue/test-utils'
import { NTabs } from '../index'

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
})
