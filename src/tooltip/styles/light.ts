import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import { popoverLight, PopoverTheme } from '../../popover/styles'
import commonVars from './_common'
import type { Theme } from '../../_mixins/use-theme'

const self = (vars: ThemeCommonVars) => {
  const { borderRadius, boxShadow2, baseColor } = vars
  return {
    ...commonVars,
    borderRadius: borderRadius,
    boxShadow: boxShadow2,
    color: 'rgba(0, 0, 0, .85)',
    textColor: baseColor
  }
}

export type TooltipThemeVars = ReturnType<typeof self>

const tooltipLight: Theme<
  TooltipThemeVars,
  {
    Popover?: PopoverTheme
  }
> = {
  name: 'Tooltip',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
}

export default tooltipLight
export type TooltipTheme = typeof tooltipLight
