import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'light',
  name: 'Menu',
  getDerivedVariables ({ base, derived }) {
    return {
      borderRadius: base.borderRadius,
      groupTextColor: derived.textColor3,
      itemColorMatch: changeColor(derived.primaryColor, { alpha: 0.1 }),
      itemTextColor: derived.textColor2,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorChildSelected: derived.primaryColor,
      itemTextColorSelected: derived.primaryColor,
      itemExtraTextColor: derived.textColor3,
      itemExtraTextColorHover: derived.primaryColorHover,
      itemExtraTextColorChildSelected: derived.primaryColor,
      itemExtraTextColorSelected: derived.primaryColor,
      itemIconColor: derived.textColor1,
      itemIconColorHover: derived.primaryColorHover,
      itemIconColorSelected: derived.primaryColor,
      itemIconColorChildSelected: derived.primaryColor,
      itemIconColorCollapsed: derived.textColor1,
      borderColorHorizontal: derived.primaryColor,
      submenuArrowColor: derived.primaryColor
    }
  }
})
