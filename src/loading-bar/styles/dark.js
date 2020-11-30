import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'LoadingBar',
  theme: 'dark',
  getDerivedVars (vars) {
    const {
      successColor
    } = vars
    return {
      colorError: 'red',
      colorLoading: successColor,
      height: '2px'
    }
  }
})
