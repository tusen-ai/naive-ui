import create from '../../../styles/_utils/create-component-base'

// no style, placeholder
export default create({
  theme: 'light',
  name: 'BaseSlotMachine',
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})
