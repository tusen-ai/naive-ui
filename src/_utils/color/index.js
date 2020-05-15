/**
 * The color utils are for internal usage, it needs to work first. API design
 * need to be refined later.
 */

function floor (number) {
  return Math.floor(Number(number))
}

/**
 *
 * @param {string} color support #000, #000000, rgb(0, 0, 0)
 * @returns [r, g, b]
 */
export function read (color) {
  if (!color) return null
  if (color.startsWith('#')) {
    let channels = null
    if (color.length === 4) channels = color.slice(1, 4).split('').map(c => c + c)
    else if (color.length === 7) {
      channels = [
        color.slice(1, 3),
        color.slice(3, 5),
        color.slice(5, 7)
      ]
    } else throw new Error('Invalid color value: ' + color)
    return channels.map(c => parseInt(c, 16))
  }
  const rgbRegex = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
  const rgbResult = color.match(rgbRegex)
  if (rgbResult) return [rgbResult[1], rgbResult[2], rgbResult[3]]
  throw new Error('Invalid color value: ' + color)
}

/**
 *
 * @param {[number, number, number]} base
 * @param {[number, number, number, number]} overlay
 */
export function composite (base, overlay) {
  return 'rgb(' + base.map((v, i) => floor(v * (1 - overlay[3]) + overlay[i] * overlay[3])).join(', ') + ')'
}

export function hash (rgb) {
  if (!rgb) return null
  return rgb.join('-')
}
