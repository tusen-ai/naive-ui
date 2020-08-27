import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
  name: 'Switch',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor
    } = derived
    const railOverlayColor = 'rgba(255, 255, 255, .20)'
    return {
      railBackgroundColor: {
        inactive: railOverlayColor,
        active: changeColor(primaryColor, { alpha: '0.25' })
      },
      switcherBackgroundImage: {
        inactive: 'linear-gradient(52deg,rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(148,151,155,1) 75%,rgba(148,151,155,1) 100%)',
        active: 'linear-gradient(52deg,rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(120,205,104,1) 75%,rgba(20,166,165,1) 100%)'
      },
      switchBackgroundPosition: '100%, 0%',
      switcherBoxShadow: '0px 2px 4px 0px rgba(0,0,0,0.4)'
    }
  }
})
