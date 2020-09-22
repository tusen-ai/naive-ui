import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Timeline',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorTertiaryOverlay,
      infoColorSuppl,
      errorColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      textColorPrimaryOverlay,
      textColorSecondaryOverlay,
      railColorOverlay
    } = derived
    const {
      strongFontWeight
    } = base
    return {
      ...sizeVariables,
      headerFontWeight: strongFontWeight,
      circleBorderColor: textColorTertiaryOverlay,
      circleBorderColorInfo: infoColorSuppl,
      circleBorderColorError: errorColorSuppl,
      circleBorderColorSuccess: successColorSuppl,
      circleBorderColorWarning: warningColorSuppl,
      headerTextColor: textColorPrimaryOverlay,
      contentTextColor: textColorSecondaryOverlay,
      metaTextColor: textColorTertiaryOverlay,
      lineColor: railColorOverlay
    }
  }
})
