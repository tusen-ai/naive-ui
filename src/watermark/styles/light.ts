import { commonLight } from '../../_styles/common'
import { createTheme } from '../../_mixins'

const watermarkLight = createTheme({
  name: 'Watermark',
  common: commonLight
})

export default watermarkLight
export type WatermarkTheme = typeof watermarkLight
