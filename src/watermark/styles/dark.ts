import type { WatermarkTheme } from './light'
import { commonDark } from '../../_styles/common'

const watermarkDark: WatermarkTheme = {
  name: 'Watermark',
  common: commonDark,
  self(vars) {
    const { fontFamily } = vars
    return {
      fontFamily
    }
  }
}

export default watermarkDark
