import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Thing',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextOverlayColor,
      secondaryTextOverlayColor
    } = derived
    return {
      thingHeaderTextColor: primaryTextOverlayColor,
      thingTextColor: secondaryTextOverlayColor
    }
  }
})
