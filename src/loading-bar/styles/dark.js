import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'LoadingBar',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      successColor
    } = derived
    return {
      colorError: 'red',
      colorLoading: successColor,
      height: '2px'
    }
  }
})
