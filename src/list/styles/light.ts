import { composite } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    cardColor,
    modalColor,
    popoverColor,
    dividerColor,
    borderRadius,
    fontSize,
    hoverColor
  } = vars
  return {
    textColor: textColor2,
    color: cardColor,
    colorHover: hoverColor,
    colorModal: modalColor,
    colorHoverModal: composite(modalColor, hoverColor),
    colorPopover: popoverColor,
    colorHoverPopover: composite(popoverColor, hoverColor),
    borderColor: dividerColor,
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    borderRadius,
    fontSize
  }
}

export type ListThemeVars = ReturnType<typeof self>

const listLight: Theme<'List', ListThemeVars> = {
  name: 'List',
  common: commonLight,
  self
}

export default listLight
export type ListTheme = typeof listLight
