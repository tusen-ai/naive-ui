import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export interface WatermarkThemeVars {
  fontFamily: string
}

const watermarkLight: WatermarkTheme = createTheme({
  name: 'Watermark',
  common: commonLight,
  self(vars) {
    const { fontFamily } = vars
    return {
      fontFamily
    }
  }
})

export interface WatermarkTheme extends Theme<
  'Watermark',
  WatermarkThemeVars
> {}

export interface WatermarkThemeOverrides extends ExtractThemeOverrides<WatermarkTheme> {}

export default watermarkLight
