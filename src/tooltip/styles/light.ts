import type { ExtractThemeOverrides, Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import type { PopoverTheme } from '../../popover/styles'
import { composite } from 'seemly'
import { createTheme } from '../../_mixins/use-theme'
import { commonLight } from '../../_styles/common'
import { popoverLight } from '../../popover/styles'
import commonVars from './_common'

function self(vars: ThemeCommonVars) {
  const { borderRadius, boxShadow2, baseColor } = vars
  return {
    ...commonVars,
    borderRadius,
    boxShadow: boxShadow2,
    color: composite(baseColor, 'rgba(0, 0, 0, .85)'),
    textColor: baseColor
  }
}

export interface TooltipThemeVars extends ReturnType<typeof self> {}

const tooltipLight: TooltipTheme = createTheme({
  name: 'Tooltip',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
})

export interface TooltipTheme extends Theme<
  'Tooltip',
  TooltipThemeVars,
  {
    Popover: PopoverTheme
  }
> {}

export interface TooltipThemeOverrides extends ExtractThemeOverrides<TooltipTheme> {}

export default tooltipLight
