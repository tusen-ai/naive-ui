import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Element',
  getDerivedVariables ({ base, derived }) {
    return {
      ...base,
      ...derived
    }
  }
})
