import create from '../../styles/_utils/create-component-base'

// no style, placeholder
export default create({
  theme: 'dark',
  name: 'Time',
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})
