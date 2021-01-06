import { changeColor } from 'seemly'
import { selectDark } from '../../select/styles'
import { inputDark } from '../../input/styles'
import { iconDark } from '../../icon/styles'
import commonVariables from './_common.js'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Pagination',
  common: commonDark,
  peers: {
    Select: selectDark,
    Input: inputDark,
    Icon: iconDark
  },
  self (vars) {
    const {
      textColor2Overlay,
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      inputColorDisabledOverlay,
      textColorDisabledOverlay,
      borderColorOverlay,
      opacity3,
      borderRadius,
      fontSize
    } = vars
    const borderColor = changeColor(primaryColor, {
      alpha: opacity3
    })
    return {
      ...commonVariables,
      buttonColor: 'transparent',
      buttonColorHover: 'transparent',
      buttonColorPressed: 'transparent',
      buttonBorder: `1px solid ${borderColorOverlay}`,
      buttonBorderHover: `1px solid ${borderColorOverlay}`,
      buttonBorderPressed: `1px solid ${borderColorOverlay}`,
      buttonIconColor: textColor2Overlay,
      buttonIconColorHover: textColor2Overlay,
      buttonIconColorPressed: textColor2Overlay,
      itemTextColor: textColor2Overlay,
      itemTextColorHover: primaryColorHover,
      itemTextColorPressed: primaryColorPressed,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: textColorDisabledOverlay,
      itemColor: 'transparent',
      itemColorHover: 'transparent',
      itemColorPressed: 'transparent',
      itemColorActive: 'transparent',
      itemColorDisabled: inputColorDisabledOverlay,
      itemBorder: '1px solid transparent',
      itemBorderHover: '1px solid transparent',
      itemBorderPressed: '1px solid transparent',
      itemBorderActive: `1px solid ${borderColor}`,
      itemBorderDisabled: '1px solid transparent',
      itemBorderRadius: borderRadius,
      itemFontSize: fontSize,
      jumperTextColor: textColor2Overlay,
      jumperTextColorDisabled: textColorDisabledOverlay
    }
  }
}
