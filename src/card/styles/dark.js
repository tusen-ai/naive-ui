import create from '../../styles/_utils/create-component-base'
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
      color: derived.color,
      textColor: derived.secondaryTextOverlayColor,
      titleTextColor: derived.primaryTextOverlayColor,
      borderColor: derived.dividerOverlayColor,
      actionColor: derived.actionBackgroundOverlayColor,
      titleFontWeight: base.strongFontWeight,
      closeColor: derived.closeOverlayColor,
      closeColorHover: derived.closeHoverOverlayColor,
      closeColorActive: derived.closeActiveOverlayColor,
      borderRadius
    }
  }
})
