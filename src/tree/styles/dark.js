import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon/styles'
import { checkboxDark } from '../../checkbox/styles'
import { baseLoadingDark } from '../../_base/loading/styles'

export default create({
  theme: 'dark',
  name: 'Tree',
  peer: [
    baseDark,
    iconDark,
    checkboxDark,
    baseLoadingDark
  ],
  getLocalVars (vars) {
    const {
      borderRadiusSmall,
      hoverColorOverlay,
      activeColorOverlay,
      primaryColor,
      textColor3Overlay,
      textColor2Overlay,
      textColorDisabledOverlay
    } = vars
    return {
      borderRadiusSmall,
      nodeColorHover: hoverColorOverlay,
      nodeColorPressed: activeColorOverlay,
      nodeColorSelected: changeColor(primaryColor, { alpha: 0.15 }),
      arrowColor: textColor3Overlay,
      nodeTextColor: textColor2Overlay,
      nodeTextColorDisabled: textColorDisabledOverlay
    }
  }
})
