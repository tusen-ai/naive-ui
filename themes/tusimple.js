// Unstable!
// Draft Code!
// Variable Names Will Be Refactored!

function tusimpleTheme (naive) {
  naive.styles.light.override({
    derived: {
      primaryColor: '#4fb233',
      primaryHoverColor: '#62cc45',
      primaryActiveColor: '#388025',
      infoColor: '#335fff',
      successColor: '#4fb233',
      errorColor: '#f22451',
      warningColor: '#fac70d'
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
