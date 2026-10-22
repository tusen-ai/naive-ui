import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { composite } from 'seemly'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
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

export interface ListThemeVars extends ReturnType<typeof self> {}

const listLight: ListTheme = {
  name: 'List',
  common: commonLight,
  self
}

export interface ListTheme extends Theme<'List', ListThemeVars> {}

export interface ListThemeOverrides extends ExtractThemeOverrides<ListTheme> {}

export default listLight
