import { commonDark } from '../../_styles/common'
import type { WatermarkTheme } from './light'

const watermarkDark: WatermarkTheme = {
  name: 'Watermark',
  common: commonDark,
  self (vars) {
    const { fontFamily } = vars
    return {
      fontFamily
    }
  }
}

export default watermarkDark
