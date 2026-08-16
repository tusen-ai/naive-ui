import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { TooltipTheme } from '../../tooltip/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { tooltipLight } from '../../tooltip/styles'

export interface EllipsisThemeVars {}

const ellipsisLight: EllipsisTheme = createTheme({
  name: 'Ellipsis',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  }
})

export interface EllipsisTheme extends Theme<
  'Ellipsis',
  EllipsisThemeVars,
  {
    Tooltip: TooltipTheme
  }
> {}

export interface EllipsisThemeOverrides extends ExtractThemeOverrides<EllipsisTheme> {}

export default ellipsisLight
