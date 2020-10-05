import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Timeline',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorTertiary,
      infoColor,
      errorColor,
      successColor,
      warningColor,
      textColorPrimary,
      textColorSecondary,
      railColorOverlay
    } = derived
    const {
      fontWeightStrong
    } = base
    return {
      ...sizeVariables,
      headerFontWeight: fontWeightStrong,
      circleBorderColor: textColorTertiary,
      circleBorderColorInfo: infoColor,
      circleBorderColorError: errorColor,
      circleBorderColorSuccess: successColor,
      circleBorderColorWarning: warningColor,
      headerTextColor: textColorPrimary,
      contentTextColor: textColorSecondary,
      metaTextColor: textColorTertiary,
      lineColor: railColorOverlay
    }
  }
})
