import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self() {
  return {
    widthSmall: '30px',
    widthMedium: '32px',
    widthLarge: '38px'
  }
}

const inputOptLight = createTheme({
  name: 'InputOpt',
  common: commonLight,
  self
})

export default inputOptLight
export type InputOptTheme = typeof inputOptLight
