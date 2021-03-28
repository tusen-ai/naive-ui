import { mount } from '@vue/test-utils'
import { NSlider } from '../index'

describe('n-slider', () => {
  it('should work with import on demand', () => {
    mount(NSlider)
  })
  it('accept correct callback types', () => {
    function onUpdateValue1 (value: number): void {}
    function onUpdateValue2 (value: [number, number]): void {}
    mount(NSlider, {
      props: {
        onUpdateValue: onUpdateValue1
      }
    })
    mount(NSlider, {
      props: {
        onUpdateValue: onUpdateValue2
      }
    })
  })
})
