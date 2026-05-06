import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { popoverLight } from '../../popover/styles'

export function self(vars: ThemeCommonVars) {
  const {
    borderRadius,
    boxShadow2,
    fontSize,
    fontSizeMedium,
    fontWeightStrong,
    modalColor,
    popoverColor,
    textColor2,
    textColor1,
    dividerColor
  } = vars
  return {
    borderRadius,
    boxShadow: boxShadow2,
    color: modalColor || popoverColor,
    dividerColor,
    fontSize,
    titleFontSize: fontSizeMedium,
    titleFontWeight: fontWeightStrong,
    textColor: textColor2,
    titleTextColor: textColor1,
    maskColor: 'rgba(0, 0, 0, .45)',
    padding: '16px',
    actionGap: '8px',
    popoverPadding: '0'
  }
}

export type GuideThemeVars = ReturnType<typeof self>

const guideLight = createTheme({
  name: 'Guide',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Popover: popoverLight
  },
  self
})

export default guideLight
export type GuideTheme = typeof guideLight
