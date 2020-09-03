import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Timeline',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      tertiaryTextColor,
      infoColor,
      errorColor,
      successColor,
      warningColor,
      primaryTextColor,
      secondaryTextColor,
      railBackgroundOverlayColor
    } = derived
    const {
      strongFontWeight
    } = base
    return {
      ...sizeVariables,
      headerFontWeight: strongFontWeight,
      circleBorderColor: tertiaryTextColor,
      circleBorderColorInfo: infoColor,
      circleBorderColorError: errorColor,
      circleBorderColorSuccess: successColor,
      circleBorderColorWarning: warningColor,
      headerTextColor: primaryTextColor,
      contentTextColor: secondaryTextColor,
      metaTextColor: tertiaryTextColor,
      lineColor: railBackgroundOverlayColor
    }
  }
})
