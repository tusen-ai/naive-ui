import { mount } from '@vue/test-utils'
import { NRate } from '../index'

describe('n-rate', () => {
  it('should work with import on demand', () => {
    mount(NRate)
  })

  it('should work with `count` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ count: 10 })
    expect(wrapper.findAll('.n-rate__item').length).toBe(10)

    wrapper.unmount()
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ value: 3, count: 10 })
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(3)
    await wrapper.setProps({ value: 10 })
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(10)

    wrapper.unmount()
  })

  it('should work with `defaultValue` prop', async () => {
    const wrapper = mount(NRate, { props: { defaultValue: 8, count: 10 } })

    expect(wrapper.findAll('.n-rate__item--active').length).toBe(8)

    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ size: 20 })
    expect(wrapper.find('.n-rate').attributes('style')).toContain(
      '--n-item-size: 20px'
    )

    for (const size of ['small', 'medium', 'large'] as const) {
      await wrapper.setProps({ size })
      expect(wrapper.find('.n-rate').attributes('style')).toMatchSnapshot()
    }

    wrapper.unmount()
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ color: '#4fb233' })
    expect(wrapper.find('.n-rate').attributes('style')).toContain(
      '--n-item-color-active: #4fb233'
    )

    wrapper.unmount()
  })

  it('should work with `onUpdateValue` prop', async () => {
    const onUpdateValue = jest.fn()
    const onUpdateValue2 = jest.fn()
    const wrapper = mount(NRate)

    const testNumber = 2

    await wrapper.setProps({ onUpdateValue, 'onUpdate:value': onUpdateValue })
    await wrapper.findAll('.n-rate__item')[testNumber].trigger('click')
    expect(onUpdateValue).toHaveBeenCalledWith(testNumber + 1)
    expect(onUpdateValue).toHaveBeenCalledTimes(2)

    await wrapper.setProps({
      onUpdateValue: [onUpdateValue, onUpdateValue2],
      'onUpdate:value': [onUpdateValue, onUpdateValue2]
    })
    await wrapper.findAll('.n-rate__item')[testNumber].trigger('click')
    expect(onUpdateValue).toHaveBeenCalledWith(testNumber + 1)
    expect(onUpdateValue2).toHaveBeenCalledWith(testNumber + 1)
    expect(onUpdateValue).toHaveBeenCalledTimes(4)

    wrapper.unmount()
  })

  it('should work with `readonly` prop', async () => {
    const wrapper = mount(NRate)

    await wrapper.setProps({ readonly: true })

    expect(wrapper.find('.n-rate').classes()).toContain('n-rate--readonly')

    await wrapper.setProps({ readonly: true, value: 3 })
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(3)

    await wrapper.findAll('.n-rate__item')[3].trigger('click')
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(3)

    await wrapper.findAll('.n-rate__item')[3].trigger('mousemove')
    expect(wrapper.findAll('.n-rate__item--active').length).toBe(3)

    wrapper.unmount()
  })

  it('should work with `allowHalf` prop', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mount(NRate)
    await wrapper.setProps({ allowHalf: true })

    await wrapper.setProps({ onUpdateValue })
    // Test clicking on the left half of the third star (index 2)
    const rateItem = wrapper.findAll('.n-rate__item')[2]
    const mockEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
    // Mock offsetX to be in the left half of the star
    Object.defineProperty(mockEvent, 'offsetX', {
      value: 10, // Small value to simulate left half
      writable: true
    })
    Object.defineProperty(mockEvent, 'currentTarget', {
      value: {
        offsetWidth: 30 // Mock width
      },
      writable: true
    })
    await rateItem.element.dispatchEvent(mockEvent)
    // Should be 2.5 (index 2 + 0.5)
    expect(onUpdateValue).toHaveBeenCalledWith(2.5)

    // Test clicking on the right half of the same star
    onUpdateValue.mockClear()
    const mockEventRight = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
    // Mock offsetX to be in the right half of the star
    Object.defineProperty(mockEventRight, 'offsetX', {
      value: 20, // Larger value to simulate right half (>= 15, which is Math.floor(30/2))
      writable: true
    })
    Object.defineProperty(mockEventRight, 'currentTarget', {
      value: {
        offsetWidth: 30 // Mock width
      },
      writable: true
    })
    await rateItem.element.dispatchEvent(mockEventRight)
    // Should be 3 (index 2 + 1)
    expect(onUpdateValue).toHaveBeenCalledWith(3)

    wrapper.unmount()
  })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(NRate)
    await wrapper.setProps({ clearable: true })

    const testNumber = 2

    await wrapper.findAll('.n-rate__item')[testNumber].trigger('click')
    expect(wrapper.findAll('.n-rate__item--active').length).toEqual(
      testNumber + 1
    )

    await wrapper.findAll('.n-rate__item')[testNumber].trigger('click')
    expect(wrapper.findAll('.n-rate__item--active').length).toEqual(0)

    wrapper.unmount()
  })
})
