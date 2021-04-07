import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

function self () {
  return {}
}

export const imageLight = createTheme({
  name: 'Image',
  common: commonLight,
  self
})

export type ImageTheme = typeof imageLight
export type ImageThemeVars = ReturnType<typeof self>
