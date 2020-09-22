import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Card',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      color: derived.cardColor,
      textColor: derived.textColorSecondary,
      titleTextColor: derived.textColorPrimary,
      borderColor: derived.dividerColorOverlay,
      actionColor: derived.actionColorOverlay,
      titleFontWeight: base.fontWeightStrong,
      closeColor: derived.closeColor,
      closeColorHover: derived.closeColorHover,
      closeColorActive: derived.closeColorPressed,
      borderRadius
    }
  }
})
