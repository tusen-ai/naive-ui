import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../scrollbar/styles'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    modalColor,
    textColor1,
    textColor2,
    boxShadow3,
    lineHeight,
    fontWeightStrong,
    dividerColor
  } = vars
  return {
    bodyPadding: '16px 24px',
    headerPadding: '16px 24px',
    footerPadding: '16px 24px',
    color: modalColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    titleFontSize: '20px',
    titleFontWeight: fontWeightStrong,
    boxShadow: boxShadow3,
    lineHeight,
    headerBorderBottom: `1px solid ${dividerColor}`,
    footerBorderTop: `1px solid ${dividerColor}`
  }
}

export type DrawerThemeVars = ReturnType<typeof self>

const drawerLight = createTheme({
  name: 'Drawer',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
})

export default drawerLight
export type DrawerTheme = typeof drawerLight
