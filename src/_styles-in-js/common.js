import commonStyle from './common.scss'

function extractLength (length) {
  return Number(length.match(/^\d+/)[0])
}

export const itemSize = {
  tiny: extractLength(commonStyle.tinySize),
  small: extractLength(commonStyle.smallSize),
  medium: extractLength(commonStyle.mediumSize),
  large: extractLength(commonStyle.largeSize),
  huge: extractLength(commonStyle.hugeSize)
}
