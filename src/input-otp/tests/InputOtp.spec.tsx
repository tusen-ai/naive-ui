import { mount } from '@vue/test-utils'
import { NInputOtp } from '../index'

describe('n-input-otp', () => {
  it('should work with import on demand', () => {
    mount(NInputOtp)
  })

  describe('handleInput multi-character (autofill)', () => {
    it('should distribute multi-char input across fields', async () => {
      const onUpdateValue = vi.fn()
      const wrapper = mount(NInputOtp, {
        props: {
          length: 6,
          onUpdateValue
        }
      })
      const inputs = wrapper.findAll('input')
      // Simulate autofill setting full value on first input
      await inputs[0].setValue('123456')
      expect(onUpdateValue).toHaveBeenCalled()
      const value = onUpdateValue.mock.calls[0][0]
      expect(value).toEqual(['1', '2', '3', '4', '5', '6'])
    })

    it('should distribute multi-char input from middle index', async () => {
      const onUpdateValue = vi.fn()
      const wrapper = mount(NInputOtp, {
        props: {
          length: 6,
          defaultValue: ['1', '2', '3', '', '', ''],
          onUpdateValue
        }
      })
      const inputs = wrapper.findAll('input')
      await inputs[3].setValue('456')
      expect(onUpdateValue).toHaveBeenCalled()
      const value = onUpdateValue.mock.calls[0][0]
      expect(value).toEqual(['1', '2', '3', '4', '5', '6'])
    })

    it('should respect allowInput for multi-char input', async () => {
      const onUpdateValue = vi.fn()
      const wrapper = mount(NInputOtp, {
        props: {
          length: 6,
          allowInput: (char: string) => /\d/.test(char),
          onUpdateValue
        }
      })
      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('12a456')
      expect(onUpdateValue).toHaveBeenCalled()
      const value = onUpdateValue.mock.calls[0][0]
      // 'a' should be skipped
      expect(value).toEqual(['1', '2', '4', '5', '6', ''])
    })

    it('should stop at length boundary', async () => {
      const onUpdateValue = vi.fn()
      const wrapper = mount(NInputOtp, {
        props: {
          length: 4,
          onUpdateValue
        }
      })
      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('123456')
      expect(onUpdateValue).toHaveBeenCalled()
      const value = onUpdateValue.mock.calls[0][0]
      expect(value).toEqual(['1', '2', '3', '4'])
    })

    it('should handle single-char input unchanged', async () => {
      const onUpdateValue = vi.fn()
      const wrapper = mount(NInputOtp, {
        props: {
          length: 6,
          defaultValue: ['1', '2', '', '', '', ''],
          onUpdateValue
        }
      })
      const inputs = wrapper.findAll('input')
      await inputs[2].setValue('5')
      expect(onUpdateValue).toHaveBeenCalled()
      const value = onUpdateValue.mock.calls[0][0]
      expect(value[2]).toBe('5')
    })
  })
})
