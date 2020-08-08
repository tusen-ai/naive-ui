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
      color: derived.color,
      textColor: derived.secondaryTextColor,
      titleTextColor: derived.primaryTextColor,
      borderColor: derived.dividerOverlayColor,
      actionColor: derived.actionBackgroundOverlayColor,
      titleFontWeight: base.strongFontWeight,
      closeColor: derived.closeColor,
      closeColorHover: derived.closeHoverColor,
      closeColorActive: derived.closeActiveColor,
      borderRadius
    }
  }
})
