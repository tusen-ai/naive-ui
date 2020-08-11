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
      backgroundColor: {
        error: errorColor,
        loading: successColor
      },
      barHeight: '2px'
    }
  }
})
