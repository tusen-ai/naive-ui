import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
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
