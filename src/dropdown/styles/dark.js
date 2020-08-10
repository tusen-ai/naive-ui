import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
  name: 'Drawer',
  getDerivedVariables ({ derived }) {
    const {
      secondaryTextOverlayColor,
      primaryColor
    } = derived
    return {
      suffixFill: secondaryTextOverlayColor,
      textColor: {
        hover: primaryColor,
        selected: primaryColor
      },
      selectedBackgroundColor: changeColor(primaryColor, { alpha: 0.15 })
    }
  }
})
