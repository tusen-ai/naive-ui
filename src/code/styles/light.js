import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Code',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor
    } = derived
    return {
      codeTextColor: secondaryTextColor
    }
  }
})
