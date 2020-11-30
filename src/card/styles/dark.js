import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Card',
  getDerivedVars (vars) {
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
      closeColorHover: vars.colorColorHoverOverlay,
      closeColorPressed: vars.closeColorPressedOverlay,
      borderRadius
    }
  }
})
