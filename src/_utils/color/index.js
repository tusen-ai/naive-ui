/* eslint-disable no-cond-assign */
/**
 * The color utils are for internal usage, it needs to work first. API design
 * need to be refined later.
 */
function floor (number) {
  return Math.floor(Number(number))
}

const prefix = '^\\s*'
const suffix = '\\s*$'
const num = '\\s*(\\d+)\\s*'
const float = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*'
const hex = '([0-9A-Fa-f])'
const dhex = '([0-9A-Fa-f]{2})'
const rgbRegex = new RegExp(`${prefix}rgb\\s*\\(${num},${num},${num}\\)${suffix}`)
const rgbaRegex = new RegExp(`${prefix}rgba\\s*\\(${num},${num},${num},${float}\\)${suffix}`)
const sHexRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${suffix}`)
const hexRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${suffix}`)
const sHexaRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${hex}${suffix}`)
const hexaRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${dhex}${suffix}`)

function parseHex (value) {
  return parseInt(value, 16)
}

/**
 * @param {string} color support #000[0], #000000[00], rgb(0, 0, 0), rgba(0, 0, 0, 0)
 * @returns [r, g, b, a]
 */
export function read (color) {
  try {
    let i
    if (i = hexRegex.exec(color)) {
      return [
        parseHex(i[1]),
        parseHex(i[2]),
        parseHex(i[3]),
        1
      ]
    } else if (i = rgbRegex.exec(color)) {
      return [
        parseInt(i[1]),
        parseInt(i[2]),
        parseInt(i[3]),
        1
      ]
    } else if (i = rgbaRegex.exec(color)) {
      return [
        parseInt(i[1]),
        parseInt(i[2]),
        parseInt(i[3]),
        Number(i[4])
      ]
    } else if (i = sHexRegex.exec(color)) {
      return [
        parseHex(i[1] + i[1]),
        parseHex(i[2] + i[2]),
        parseHex(i[3] + i[3]),
        1
      ]
    } else if (i = hexaRegex.exec(color)) {
      return [
        parseHex(i[1]),
        parseHex(i[2]),
        parseHex(i[3]),
        parseHex(i[4]) / 255
      ]
    } else if (i = sHexaRegex.exec(color)) {
      return [
        parseHex(i[1] + i[1]),
        parseHex(i[2] + i[2]),
        parseHex(i[3] + i[3]),
        parseHex(i[4] + i[4]) / 255
      ]
    }
    throw new Error('[naive-ui/utils/color]: Invalid color value ' + color)
  } catch (e) {
    console.log(e)
  }
}

/**
 *
 * @param {string | [number, number, number]} base
 * @param {string | [number, number, number, number]} overlay
 */
export function composite (base, overlay) {
  if (!Array.isArray(base)) base = read(base)
  if (!Array.isArray(overlay)) overlay = read(overlay)
  if (process.env.NODE_ENV !== 'production') {
    if (base.length === 3 && base[3] !== 1) {
      console.error('[naive-ui/utils/color/composite]: base color has alpha')
    }
  }
  return 'rgb(' + base.slice(0, 3).map((v, i) => floor(v * (1 - overlay[3]) + overlay[i] * overlay[3])).join(', ') + ')'
}

export function changeColor (base, options) {
  const [r, g, b] = read(base)
  if (options.alpha) {
    return `rgba(${r}, ${g}, ${b}, ${options.alpha})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

export function hash (rgb) {
  if (!rgb) return null
  return rgb.join('-')
}

export function createHoverColor (rgb) {
  return composite(rgb, [255, 255, 255, 0.14])
}

export function createActiveColor (rgb) {
  return composite(rgb, [0, 0, 0, 0.1])
}
