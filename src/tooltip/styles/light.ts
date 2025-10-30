import type { ThemeCommonVars } from '../../_styles/common'
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

export type TooltipThemeVars = ReturnType<typeof self>

const tooltipLight = createTheme({
  name: 'Tooltip',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
})

export default tooltipLight
export type TooltipTheme = typeof tooltipLight
