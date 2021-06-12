import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { NColorPicker } from '../index'

describe('n-color-picker', () => {
  it('should work with import on demand', () => {
    mount(NColorPicker)
  })
  describe('props.modes', () => {
    it('multiple modes', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          modes: ['hex', 'hsl']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).not.toEqual(null)
      const modeDom = document.querySelector('.n-color-picker-input__mode')
      expect(modeDom?.textContent).toEqual('HEXA')
      ;(modeDom as HTMLElement).click()
      await nextTick()
      expect(modeDom?.textContent).toEqual('HSLA')
      ;(modeDom as HTMLElement).click()
      await nextTick()
      expect(modeDom?.textContent).toEqual('HEXA')
      wrapper.unmount()
    })
    it('single mode', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          modes: ['hex']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).not.toEqual(null)
      const modeDom = document.querySelector('.n-color-picker-input__mode')
      expect(modeDom?.textContent).toEqual('HEXA')
      ;(modeDom as HTMLElement).click()
      await nextTick()
      expect(modeDom?.textContent).toEqual('HEXA')
      wrapper.unmount()
    })
  })
})
