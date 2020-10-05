import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Progress',
  theme: 'light',
  getDerivedVariables ({ derived }) {
    return {
      railColor: derived.progressRailColor,
      default: {
        fillColor: derived.infoColor
      },
      info: {
        fillColor: derived.infoColor
      },
      success: {
        fillColor: derived.successColor
      },
      warning: {
        fillColor: derived.warningColor
      },
      error: {
        fillColor: derived.errorColor
      },
      innerIndicatorTextColor: 'rgb(255, 255, 255)',
      outerIndicatorTextColor: 'rgb(255, 255, 255)',
      lineBackgroundImageProcessing: 'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
    }
  }
})
