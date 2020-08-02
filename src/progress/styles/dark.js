import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Progress',
  theme: 'dark',
  getDerivedVariables ({ derived }) {
    return {
      railColor: derived.progressRailBackgroundOverlayColor,
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
      innerIndicatorTextColor: 'rgb(0, 0, 0)',
      outerIndicatorTextColor: 'rgb(0, 0, 0)',
      lineBackgroundImageProcessing: 'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
    }
  }
})
