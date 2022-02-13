import { commonLight } from '../../_styles/common'
import { createTheme } from '../../_mixins'

const watermarkLight = createTheme({
  name: 'Watermark',
  common: commonLight,
  self (vars) {
    const { fontFamily } = vars
    return {
      fontFamily
    }
  }
})

export default watermarkLight
export type WatermarkTheme = typeof watermarkLight
