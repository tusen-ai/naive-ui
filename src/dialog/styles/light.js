import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'
import { buttonLight } from '../../button/styles'

export default create({
  theme: 'light',
  name: 'Dialog',
  peer: [baseLight, iconLight, buttonLight],
  getLocalVars (vars) {
    const {
      textColor1,
      textColor2,
      cardColor,
      closeColor,
      closeColorHover,
      closeColorPressed,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      dividerColor,
      borderRadius,
      fontWeightStrong,
      lineHeight
    } = vars
    return {
      ...commonVars,
      lineHeight,
      border: `1px solid ${dividerColor}`,
      headerTextColor: textColor1,
      textColor: textColor2,
      color: cardColor,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius,
      headerFontWeight: fontWeightStrong
    }
  }
})
