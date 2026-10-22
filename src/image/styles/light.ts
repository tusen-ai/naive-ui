import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { TooltipTheme } from '../../tooltip/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { tooltipLight } from '../../tooltip/styles'

function self() {
  return {
    toolbarIconColor: 'rgba(255, 255, 255, .9)',
    toolbarColor: 'rgba(0, 0, 0, .35)',
    toolbarBoxShadow: 'none',
    toolbarBorderRadius: '24px'
  }
}
export const imageLight: ImageTheme = createTheme({
  name: 'Image',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  },
  self
})

export interface ImageThemeVars extends ReturnType<typeof self> {}

export interface ImageTheme extends Theme<
  'Image',
  ImageThemeVars,
  {
    Tooltip: TooltipTheme
  }
> {}

export interface ImageThemeOverrides extends ExtractThemeOverrides<ImageTheme> {}
