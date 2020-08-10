import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Divider',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextColor,
      dividerOverlayColor
    } = derived
    return {
      dividerTextColor: primaryTextColor,
      dividerBorderColor: dividerOverlayColor
    }
  }
})
