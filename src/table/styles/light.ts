import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { composite } from 'seemly'
import { commonLight } from '../../_styles/common'
import sizeVariables from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    dividerColor,
    cardColor,
    modalColor,
    popoverColor,
    tableHeaderColor,
    tableColorStriped,
    textColor1,
    textColor2,
    borderRadius,
    fontWeightStrong,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge
  } = vars
  return {
    ...sizeVariables,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    lineHeight,
    borderRadius,
    borderColor: composite(cardColor, dividerColor),
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    tdColor: cardColor,
    tdColorModal: modalColor,
    tdColorPopover: popoverColor,
    tdColorStriped: composite(cardColor, tableColorStriped),
    tdColorStripedModal: composite(modalColor, tableColorStriped),
    tdColorStripedPopover: composite(popoverColor, tableColorStriped),
    thColor: composite(cardColor, tableHeaderColor),
    thColorModal: composite(modalColor, tableHeaderColor),
    thColorPopover: composite(popoverColor, tableHeaderColor),
    thTextColor: textColor1,
    tdTextColor: textColor2,
    thFontWeight: fontWeightStrong
  }
}

export interface TableThemeVars extends ReturnType<typeof self> {}

const tableLight: TableTheme = {
  name: 'Table',
  common: commonLight,
  self
}

export interface TableTheme extends Theme<'Table', TableThemeVars> {}

export interface TableThemeOverrides extends ExtractThemeOverrides<TableTheme> {}

export default tableLight
