// import { mount } from '@vue/test-utils'
import { createHoverColor, createPressedColor } from '../color'

describe('color', () => {
  it('should work with createHoverColor', () => {
    expect(createHoverColor('#666666')).toBe('rgba(126, 126, 126, 1)')
    expect(createHoverColor('rgb(42, 148, 125)')).toBe('rgba(76, 165, 146, 1)')
  })

  it('should work with createPressedColor', () => {
    expect(createPressedColor('#666666')).toBe('rgba(90, 90, 90, 1)')
    expect(createPressedColor('rgb(42, 148, 125)')).toBe(
      'rgba(37, 130, 110, 1)'
    )
  })
})
