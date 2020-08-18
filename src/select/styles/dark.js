import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Select',
  theme: 'dark',
  getDerivedVariables ({ derived, base }) {
    const {
      transformDebounceScale
    } = base
    return {
      transformDebounceScale
    }
  }
})
