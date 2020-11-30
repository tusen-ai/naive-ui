import { composite } from 'seemly'

const SPECIAL_COLOR = ['warning', 'disabled']

export const normalTypedColor = {
  // for types
  normalSuccess: '#4FB233',
  normalInfo: '#335FFF',
  normalError: '#F22451',
  normalWarning: '#FAC70D',
  normalDisabled: '#D7DAE0'
}

function overlay (isWhite = true, alpha = 0) {
  if (isWhite) {
    return [255, 255, 255, alpha]
  } else {
    return [0, 0, 0, alpha]
  }
}

function typedColorFactory (type, normalAlpha, specialAlpha, isWhiteOverlay) {
  return [
    'Success',
    'Info',
    'Error',
    'Warning',
    'Disabled'
  ].reduce((obj, item) => {
    const targetColor = Object.keys(normalTypedColor).find(colorName => colorName.includes(item))
    obj[`${type}${item}`] = composite(
      normalTypedColor[targetColor],
      SPECIAL_COLOR.includes(item.toLowerCase())
        ? overlay(isWhiteOverlay, specialAlpha)
        : overlay(isWhiteOverlay, normalAlpha))
    return obj
  }, {})
}

const hoverTypedColor = {
  ...typedColorFactory('hover', 0.15, 0.2, true)
}

const clickedTypedColor = {
  ...typedColorFactory('click', 0.15, 0.05, false)
}

export default {
  ...normalTypedColor,
  ...hoverTypedColor,
  ...clickedTypedColor
}
