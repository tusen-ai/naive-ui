import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Divider',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextOverlayColor,
      dividerOverlayColor
    } = derived
    return {
      dividerTextColor: primaryTextOverlayColor,
      dividerBorderColor: dividerOverlayColor
    }
  }
})
