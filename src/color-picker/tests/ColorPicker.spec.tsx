import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { NColorPicker } from '../index'
import { ColorPickerMode } from '../src/utils'
import { NButton } from '../../button'

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
  describe('props.control', () => {
    it('confirm and cancel button', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          actions: ['confirm']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).not.toEqual(null)
      expect(document.querySelector('.n-color-picker-pallete')).not.toEqual(
        null
      )
      expect(document.querySelector('.n-button')).not.toEqual(null)
      await wrapper.findComponent(NButton).trigger('click')
      expect(document.querySelector('.n-color-picker-panel')).toEqual(null)
      expect(document.querySelector('.n-color-picker-pallete')).toEqual(null)
      wrapper.unmount()
    })
  })
  describe('props.swatches', () => {
    it('make the colors legal', async () => {
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          swatches: ['hsva(0, 0%, 0%, 1)']
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      expect(
        document
          .querySelector('.n-color-picker-swatch__fill')
          ?.getAttribute('style')
      ).toContain('background: rgb(0, 0, 0);')
    })
    it('output according to mode', async () => {
      const onUpdateValue = jest.fn()
      const output = {
        RGBA: 'rgba(0, 0, 0, 1)',
        HSLA: 'hsla(0, 0%, 0%, 1)',
        HSVA: 'hsva(0, 0%, 0%, 1)'
      }
      const modes = Object.keys(output) as ColorPickerMode[]
      const wrapper = mount(NColorPicker, {
        attachTo: document.body,
        props: {
          swatches: ['#000000'],
          modes,
          onUpdateValue
        }
      })
      await wrapper.find('.n-color-picker-trigger').trigger('click')
      const swatch = document.querySelector('.n-color-picker-swatch')
      const modeDom = document.querySelector('.n-color-picker-input__mode')
      let length = modes.length - 1
      let currentMode: string | null | undefined = null
      while (length) {
        ;(swatch as HTMLElement).click()
        await nextTick()
        const actualOutput =
          currentMode && output[currentMode as keyof typeof output]
        if (actualOutput) {
          expect(onUpdateValue).toHaveBeenCalledWith(actualOutput)
        }
        ;(modeDom as HTMLElement).click()
        await nextTick()
        currentMode = modeDom?.textContent
        length--
      }
      wrapper.unmount()
    })
  })
})
