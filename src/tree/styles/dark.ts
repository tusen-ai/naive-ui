import { changeColor } from 'seemly'
import { checkboxDark } from '../../checkbox/styles'
import { commonDark } from '../../_styles/common'
import type { TreeTheme } from './light'

const treeDark: TreeTheme = {
  name: 'Tree',
  common: commonDark,
  peers: {
    Checkbox: checkboxDark
  },
  self (vars) {
    const {
      borderRadiusSmall,
      hoverColor,
      activeColor,
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
      nodeColorPressed: activeColor,
      nodeColorActive: changeColor(primaryColor, { alpha: 0.15 }),
      arrowColor: textColor3,
      nodeTextColor: textColor2,
      nodeTextColorDisabled: textColorDisabled,
      loadingColor: primaryColor
    }
  }
}

export default treeDark
