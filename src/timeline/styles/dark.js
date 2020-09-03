import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Timeline',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      tertiaryTextOverlayColor,
      infoHsColor,
      errorHsColor,
      successHsColor,
      warningHsColor,
      primaryTextOverlayColor,
      secondaryTextOverlayColor,
      railBackgroundOverlayColor
    } = derived
    const {
      strongFontWeight
    } = base
    return {
      ...sizeVariables,
      headerFontWeight: strongFontWeight,
      circleBorderColor: tertiaryTextOverlayColor,
      circleBorderColorInfo: infoHsColor,
      circleBorderColorError: errorHsColor,
      circleBorderColorSuccess: successHsColor,
      circleBorderColorWarning: warningHsColor,
      headerTextColor: primaryTextOverlayColor,
      contentTextColor: secondaryTextOverlayColor,
      metaTextColor: tertiaryTextOverlayColor,
      lineColor: railBackgroundOverlayColor
    }
  }
})
