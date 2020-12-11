import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon/styles'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Card',
  peer: [
    baseDark,
    iconDark
  ],
  getLocalVars (vars) {
    const {
      borderRadius
    } = vars
    return {
      ...commonVariables,
      color: vars.cardColor,
      textColor: vars.textColor2Overlay,
      titleTextColor: vars.textColor1Overlay,
      borderColor: vars.dividerColorOverlay,
      actionColor: vars.actionColorOverlay,
      titleFontWeight: vars.fontWeightStrong,
      closeColor: vars.closeColorOverlay,
      closeColorHover: vars.closeColorHoverOverlay,
      closeColorPressed: vars.closeColorPressedOverlay,
      borderRadius
    }
  }
})
