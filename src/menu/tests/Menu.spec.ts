import { mount } from '@vue/test-utils'
import { NMenu } from '../index'

describe('n-menu', () => {
  it('should work with import on demand', () => {
    mount(NMenu)
  })
  it('props.onUpdateValue type', () => {
    const stringCb = (v: string): void => {}
    const numberCb = (v: number): void => {}
    const snCb = (v: string | number): void => {}
    const stringArrCb = (v: string[]): void => {}
    const numberArrCb = (v: number[]): void => {}
    const snArrCb = (v: Array<string | number>): void => {}
    mount(NMenu, {
      props: {
        onUpdateValue: stringCb,
        onUpdateExpandedKeys: stringArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: numberCb,
        onUpdateExpandedKeys: numberArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: snCb,
        onUpdateExpandedKeys: snArrCb
      }
    })
  })
})
