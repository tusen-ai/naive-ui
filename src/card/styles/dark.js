import create from '../../styles/_utils/create-component-base'
import sizeVariable from './card'

export default create({
  theme: 'dark',
  name: 'Card',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      smallBorderRadius
    } = base
    return {
      ...sizeVariable,
      cardBackgroundColor: derived.cardBackgroundColor,
      cardTextColor: derived.secondaryTextOverlayColor,
      cardTitleTextColor: derived.primaryTextOverlayColor,
      cardBorderColor: derived.dividerOverlayColor,
      cardActionBackgroundColor: derived.actionBackgroundOverlayColor,
      strongFontWeight: base.strongFontWeight,
      cardCloseColor: {
        default: derived.closeOverlayColor,
        hover: derived.closeHoverOverlayColor,
        active: derived.closeOverlayColor
      },
      borderRadius,
      smallBorderRadius
    }
  }
})
