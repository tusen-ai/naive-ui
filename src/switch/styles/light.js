import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Switch',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor
    } = derived
    const railOverlayColor = 'rgba(0, 0, 0, .14)'
    return {
      railBackgroundColor: {
        inactive: railOverlayColor,
        active: primaryColor
      },
      switcherBackgroundImage: {
        inactive: 'linear-gradient(52deg,rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(148,151,155,1) 75%,rgba(148,151,155,1) 100%)',
        active: 'linear-gradient(52deg,rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(120,205,104,1) 75%,rgba(20,166,165,1) 100%)'
      },
      switchBackgroundPosition: '0, 0',
      switcherBoxShadow: '0px 1px 4px 0px rgba(0,0,0,0.3), inset 0px 0px 1px 0px rgba(0,0,0,0.05)'
    }
  }
})
