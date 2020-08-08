import create from '../../styles/_utils/create-component-base'
import sizeVariable from './card'

export default create({
  theme: 'light',
  name: 'Card',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      smallBorderRadius
    } = base
    return {
      ...sizeVariable,
      cardBackgroundColor: derived.cardBackgroundColor,
      cardTextColor: derived.secondaryTextColor,
      cardTitleTextColor: derived.primaryTextColor,
      cardBorderColor: derived.dividerOverlayColor,
      cardActionBackgroundColor: derived.actionBackgroundOverlayColor,
      strongFontWeight: base.strongFontWeight,
      cardCloseColor: {
        default: derived.closeColor,
        hover: derived.closeHoverColor,
        active: derived.closeColor
      },
      borderRadius,
      smallBorderRadius
    }
  }
})
