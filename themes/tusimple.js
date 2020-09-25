// Unstable!
// Draft Code!
// Variable Names Will Be Refactored!
import { composite } from '../src/_utils/color'

function tusimpleTheme (naive) {
  naive.avoidHollowOut = true
  naive.styles.light.override({
    derived: {
      borderColor: '#999',
      primaryColor: '#4FB233',
      primaryColorHover: composite('#4FB233', 'rgba(255, 255, 255, .2)'),
      primaryColorPressed: composite('#4FB233', 'rgba(0, 0, 0, .15)'),
      infoColor: '#335FFF',
      infoColorHover: composite('#335FFF', 'rgba(255, 255, 255, .2)'),
      infoColorPressed: composite('#335FFF', 'rgba(0, 0, 0, .15)'),
      successColor: '#4FB233',
      successColorHover: composite('#4FB233', 'rgba(255, 255, 255, .2)'),
      successColorPressed: composite('#4FB233', 'rgba(0, 0, 0, .15)'),
      errorColor: '#D92149',
      errorColorHover: composite('#D92149', 'rgba(255, 255, 255, .2)'),
      errorColorPressed: composite('#D92149', 'rgba(0, 0, 0, .15)'),
      warningColor: '#FFAC26',
      warningColorHover: composite('#FFAC26', 'rgba(255, 255, 255, .2)'),
      warningColorPressed: composite('#FFAC26', 'rgba(0, 0, 0, .05)'),
      textColorSecondary: '#333'
    }
  })
  naive.styles.light.Button.override({
    textColorWarning: '#333',
    iconSizeTiny: '16px',
    iconSizeSall: '20px',
    iconSizeMedium: '20px',
    iconSizeLarge: '28px',
    borderRadiusTiny: '12px',
    borderRadiusSmall: '16px',
    borderRadiusMedium: '24px',
    borderRadiusLarge: '40px',
    heightTiny: '24px',
    heightSmall: '32px',
    heightMedium: '48px',
    heightLarge: '80px',
    fontSizeTiny: '14px',
    fontSizeSmall: '16px',
    fontSizeMedium: '16px',
    fontSizeLarge: '24px',
    paddingTiny: '0 12px',
    paddingSmall: '0 24px',
    paddingMedium: '0 48px',
    paddingLarge: '0 80px',
    paddingRoundTiny: '0 12px',
    paddingRoundSmall: '0 24px',
    paddingRoundMedium: '0 48px',
    paddingRoundLarge: '0 80px',
    opacityDisabled: '1',
    colorDisabled: '#EBEDF0',
    colorPrimaryDisabled: '#EBEDF0',
    colorInfoDisabled: '#EBEDF0',
    colorSuccessDisabled: '#EBEDF0',
    colorWarningDisabled: '#EBEDF0',
    colorErrorDisabled: '#EBEDF0',
    borderColorDisabled: '#EBEDF0',
    borderColorPrimaryDisabled: '#EBEDF0',
    borderColorInfoDisabled: '#EBEDF0',
    borderColorSuccessDisabled: '#EBEDF0',
    borderColorWarningDisabled: '#EBEDF0',
    borderColorErrorDisabled: '#EBEDF0',
    textColorDisabled: '#CCCCCC',
    textColorPrimaryDisabled: '#CCCCCC',
    textColorInfoDisabled: '#CCCCCC',
    textColorSuccessDisabled: '#CCCCCC',
    textColorWarningDisabled: '#CCCCCC',
    textColorErrorDisabled: '#CCCCCC',
    textColorGhostDisabled: '#D7DAE0',
    textColorPrimaryGhostDisabled: '#D7DAE0',
    textColorInfoGhostDisabled: '#D7DAE0',
    textColorSuccessGhostDisabled: '#D7DAE0',
    textColorWarningGhostDisabled: '#D7DAE0',
    textColorErrorGhostDisabled: '#D7DAE0',
    textColorTextDisabled: '#D7DAE0',
    textColorPrimaryTextDisabled: '#D7DAE0',
    textColorInfoTextDisabled: '#D7DAE0',
    textColorSuccessTextDisabled: '#D7DAE0',
    textColorWarningTextDisabled: '#D7DAE0',
    textColorErrorTextDisabled: '#D7DAE0',
    iconMarginSmall: '8px',
    iconMarginMedium: '8px',
    iconMarginLarge: '12px'
  })
}

tusimpleTheme.install = tusimpleTheme

export default tusimpleTheme
