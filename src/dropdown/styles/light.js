import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Drawer',
  getDerivedVariables ({ derived }) {
    const {
      secondaryTextColor,
      primaryColor
    } = derived
    return {
      suffixFill: secondaryTextColor,
      textColor: {
        hover: primaryColor,
        selected: primaryColor
      },
      selectedBackgroundColor: changeColor(primaryColor, { alpha: 0.1 })
    }
  }
})
