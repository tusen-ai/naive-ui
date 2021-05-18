import { checkboxLight } from '../../checkbox/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'

export const self = (vars: ThemeCommonVars) => {
  const {
    borderRadiusSmall,
    hoverColor,
    pressedColor,
    primaryColor,
    textColor3,
    textColor2,
    textColorDisabled,
    fontSize
  } = vars
  return {
    fontSize,
    nodeBorderRadius: borderRadiusSmall,
    nodeColorHover: hoverColor,
    nodeColorPressed: pressedColor,
    nodeColorActive: hoverColor,
    arrowColor: textColor3,
    nodeTextColor: textColor2,
    nodeTextColorDisabled: textColorDisabled,
    loadingColor: primaryColor
  }
}

export type TreeThemeVars = ReturnType<typeof self>

const treeLight = createTheme({
  name: 'Tree',
  common: commonLight,
  peers: {
    Checkbox: checkboxLight,
    Scrollbar: scrollbarLight
  },
  self
})

export default treeLight
export type TreeTheme = typeof treeLight
