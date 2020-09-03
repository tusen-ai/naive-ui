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
      strongFontWeight,
      circleBorderColor: tertiaryTextOverlayColor,
      circleBorderColorInfo: infoHsColor,
      circleBorderColorError: errorHsColor,
      circleBorderColorSuccess: successHsColor,
      circleBorderColorWarning: warningHsColor,
      titleColor: primaryTextOverlayColor,
      contentColor: secondaryTextOverlayColor,
      metaColor: tertiaryTextOverlayColor,
      lineColor: railBackgroundOverlayColor
    }
  }
})
