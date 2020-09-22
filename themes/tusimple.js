// Unstable!
// Draft Code!
// Variable Names Will Be Refactored!
import { composite } from '../src/_utils/color'

function tusimpleTheme (naive) {
  naive.styles.light.override({
    derived: {
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
      errorColorPressed: composite('#FFAC26', 'rgba(0, 0, 0, .15)'),
      warningColor: '#FFAC26',
      warningColorHover: composite('#FFAC26', 'rgba(255, 255, 255, .2)'),
      warningColorPressed: composite('#FFAC26', 'rgba(0, 0, 0, .05)')
    }
  })
  naive.styles.light.Button.override({
    iconSize: {
      tiny: '16px',
      small: '20px',
      medium: '20px',
      large: '28px'
    },
    borderRadius: {
      tiny: '12px',
      small: '16px',
      medium: '24px',
      large: '40px'
    },
    height: {
      tiny: '24px',
      small: '32px',
      medium: '48px',
      large: '80px'
    },
    fontSize: {
      tiny: '14px',
      small: '16px',
      medium: '16px',
      large: '24px'
    },
    padding: {
      tiny: '0 12px',
      small: '0 24px',
      medium: '0 48px',
      large: '0 80px'
    }
  })
}

tusimpleTheme.install = tusimpleTheme

export default tusimpleTheme
