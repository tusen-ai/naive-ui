import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { NColorPicker } from '../index'
import { ColorPickerMode } from '../src/utils'

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
          modes: ['hsl']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).not.toEqual(null)
      const modeDom = document.querySelector('.n-color-picker-input__mode')
      expect(modeDom?.textContent).toEqual('HSLA')
      ;(modeDom as HTMLElement).click()
      await nextTick()
      expect(modeDom?.textContent).toEqual('HSLA')
      wrapper.unmount()
    })
    it('has correct default value', () => {
      const input: Array<{ modes: ColorPickerMode[], value: string }> = [
        {
          modes: ['hsl'],
          value: 'hsla(0, 0%, 0%, 1)'
        },
        {
          modes: ['rgb'],
          value: 'rgb(0, 00, 0, 1)'
        },
        {
          modes: ['hex'],
          value: '#00000000'
        },
        {
          modes: ['hsv', 'hsl'],
          value: 'hsv(0, 0%, 0%, 1)'
        }
      ]
      input.forEach(({ modes, value }) => {
        const wrapper = mount(NColorPicker, {
          props: {
            modes
          }
        })
        expect(wrapper.text().includes(value))
      })
    })
  })
})
