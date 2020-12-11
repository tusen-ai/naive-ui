import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon'
import { buttonDark } from '../../button'

export default create({
  theme: 'dark',
  name: 'Dialog',
  peer: [
    baseDark,
    iconDark,
    buttonDark
  ],
  getLocalVars (vars) {
    const {
      textColor1Overlay,
      textColor2Overlay,
      modalColor,
      closeColorOverlay,
      closeColorHoverOverlay,
      closeColorPressedOverlay,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      dividerColorOverlay,
      borderRadius,
      fontWeightStrong
    } = vars
    return {
      ...commonVars,
      border: `1px solid ${dividerColorOverlay}`,
      headerTextColor: textColor1Overlay,
      textColor: textColor2Overlay,
      color: modalColor,
      closeColor: closeColorOverlay,
      closeColorHover: closeColorHoverOverlay,
      closeColorPressed: closeColorPressedOverlay,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius,
      headerFontWeight: fontWeightStrong
    }
  }
})
