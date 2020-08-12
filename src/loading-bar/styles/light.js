import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'LoadingBar',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      successColor,
      errorColor
    } = derived
    return {
      colorError: errorColor,
      colorLoading: successColor,
      height: '2px'
    }
  }
})
