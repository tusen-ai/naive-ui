import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'light',
  name: 'Menu',
  getDerivedVariables ({ base, derived }) {
    return {
      groupTextColor: derived.tertiaryTextColor,
      itemColorMatch: changeColor(derived.primaryColor, { alpha: 0.1 }),
      itemTextColor: derived.secondaryTextColor,
      itemTextColorHover: derived.primaryHoverColor,
      itemTextColorChildSelected: derived.primaryColor,
      itemTextColorSelected: derived.primaryColor,
      itemExtraTextColor: derived.tertiaryTextColor,
      itemExtraTextColorHover: derived.primaryHoverColor,
      itemExtraTextColorChildSelected: derived.primaryColor,
      itemExtraTextColorSelected: derived.primaryColor,
      itemIconColor: derived.primaryTextColor,
      itemIconColorHover: derived.primaryHoverColor,
      itemIconColorSelected: derived.primaryColor,
      itemIconColorChildSelected: derived.primaryColor,
      itemIconColorCollapsed: derived.primaryTextColor,
      borderColorHorizontal: derived.primaryColor,
      submenuArrowColor: derived.primaryColor
    }
  }
})
