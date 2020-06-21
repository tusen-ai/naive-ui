import create from '../utils/create-theme-base'

export default create({
  base: {
    baseBackgroundColor: 'rgb(255, 255, 255)'
  },
  getDerivedVariables (base) {
    const derived = {
      primaryColor: base.primaryDefault,
      primaryHoverColor: base.primaryHover,
      primaryActiveColor: base.primaryActive
    }
    return derived
  }
})
