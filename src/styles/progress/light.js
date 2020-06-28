import create from '../_utils/create-component-base'

export default create({
  getDerivedVariables ({ derived }) {
    return {
      railColor: derived.railBackgroundOverlayColor,
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
      insideIndicatorTextColor: derived.secondaryTextOverlayColor,
      outsideIndicatorTextColor: 'rgb(255, 255, 255)',
      processingLineBackgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
    }
  }
})
