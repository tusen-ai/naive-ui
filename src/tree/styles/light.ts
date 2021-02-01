import { changeColor } from 'seemly'
import { checkboxLight } from '../../checkbox/styles'
import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import { createTheme } from '../../_mixins/use-theme'

const self = (vars: ThemeCommonVars) => {
  const {
    borderRadiusSmall,
    hoverColorOverlay,
    activeColorOverlay,
    primaryColor,
    textColor3,
    textColor2,
    textColorDisabled,
    fontSize
  } = vars
  return {
    fontSize,
    nodeBorderRadius: borderRadiusSmall,
    nodeColorHover: hoverColorOverlay,
    nodeColorPressed: activeColorOverlay,
    nodeColorActive: changeColor(primaryColor, { alpha: 0.1 }),
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
    Checkbox: checkboxLight
  },
  self
})

export default treeLight
export type TreeTheme = typeof treeLight
