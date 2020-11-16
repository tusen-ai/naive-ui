import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Card',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      color: derived.cardColor,
      textColor: derived.textColor2Overlay,
      titleTextColor: derived.textColor1Overlay,
      borderColor: derived.dividerColorOverlay,
      actionColor: derived.actionColorOverlay,
      titleFontWeight: base.fontWeightStrong,
      closeColor: derived.closeColorOverlay,
      closeColorHover: derived.colorColorHoverOverlay,
      closeColorPressed: derived.closeColorPressedOverlay,
      borderRadius
    }
  }
})
