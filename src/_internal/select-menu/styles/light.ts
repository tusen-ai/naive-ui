import type { ExtractThemeOverrides, Theme } from '../../../_mixins'
import type { ThemeCommonVars } from '../../../_styles/common'
import type { EmptyTheme } from '../../../empty/styles'
import type { ScrollbarTheme } from '../../scrollbar/styles'
import { createTheme } from '../../../_mixins'
import { commonLight } from '../../../_styles/common'
import { emptyLight } from '../../../empty/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    borderRadius,
    popoverColor,
    textColor3,
    dividerColor,
    textColor2,
    primaryColorPressed,
    textColorDisabled,
    primaryColor,
    opacityDisabled,
    hoverColor,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge
  } = vars
  return {
    ...commonVariables,
    optionFontSizeTiny: fontSizeTiny,
    optionFontSizeSmall: fontSizeSmall,
    optionFontSizeMedium: fontSizeMedium,
    optionFontSizeLarge: fontSizeLarge,
    optionFontSizeHuge: fontSizeHuge,
    optionHeightTiny: heightTiny,
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    borderRadius,
    color: popoverColor,
    groupHeaderTextColor: textColor3,
    actionDividerColor: dividerColor,
    optionTextColor: textColor2,
    optionTextColorPressed: primaryColorPressed,
    optionTextColorDisabled: textColorDisabled,
    optionTextColorActive: primaryColor,
    optionOpacityDisabled: opacityDisabled,
    optionCheckColor: primaryColor,
    optionColorPending: hoverColor,
    optionColorActive: 'rgba(0, 0, 0, 0)',
    optionColorActivePending: hoverColor,
    actionTextColor: textColor2,
    loadingColor: primaryColor
  }
}

export interface InternalSelectMenuThemeVars extends ReturnType<typeof self> {}

const internalSelectMenuLight: InternalSelectMenuTheme = createTheme({
  name: 'InternalSelectMenu',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Empty: emptyLight
  },
  self
})

export interface InternalSelectMenuTheme extends Theme<
  'InternalSelectMenu',
  InternalSelectMenuThemeVars,
  {
    Scrollbar: ScrollbarTheme
    Empty: EmptyTheme
  }
> {}

export interface InternalSelectMenuThemeOverrides extends ExtractThemeOverrides<InternalSelectMenuTheme> {}

export default internalSelectMenuLight
