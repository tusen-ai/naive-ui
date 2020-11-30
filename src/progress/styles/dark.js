import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Progress',
  theme: 'dark',
  getDerivedVars (vars) {
    return {
      railColor: vars.progressRailColorOverlay,
      fillColor: vars.infoColor,
      fillColorInfo: vars.infoColor,
      fillColorSuccess: vars.successColor,
      fillColorWarning: vars.warningColor,
      fillColorError: vars.errorColor,
      innerIndicatorTextColor: 'rgb(0, 0, 0)',
      outerIndicatorTextColor: vars.textColor2,
      lineBackgroundImageProcessing: 'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
    }
  }
})
