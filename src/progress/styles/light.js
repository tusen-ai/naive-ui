import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Progress',
  theme: 'light',
  getDerivedVariables ({ derived }) {
    return {
      railColor: derived.progressRailColor,
      fillColor: derived.infoColor,
      fillColorInfo: derived.infoColor,
      fillColorSuccess: derived.successColor,
      fillColorWarning: derived.warningColor,
      fillColorError: derived.errorColor,
      innerIndicatorTextColor: 'rgb(255, 255, 255)',
      outerIndicatorTextColor: derived.textColor2,
      lineBackgroundImageProcessing: 'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
    }
  }
})
