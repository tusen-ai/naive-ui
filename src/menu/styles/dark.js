import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  theme: 'dark',
  name: 'Menu',
  getDerivedVariables ({ base, derived }) {
    return {
      borderRadius: base.borderRadius,
      groupTextColor: derived.textColor3Overlay,
      itemColorMatch: changeColor(derived.primaryColor, { alpha: 0.15 }),
      itemTextColor: derived.textColor2Overlay,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorChildSelected: derived.primaryColor,
      itemTextColorSelected: derived.primaryColor,
      itemExtraTextColor: derived.textColor3Overlay,
      itemExtraTextColorHover: derived.primaryColorHover,
      itemExtraTextColorChildSelected: derived.primaryColor,
      itemExtraTextColorSelected: derived.primaryColor,
      itemIconColor: derived.textColor1Overlay,
      itemIconColorHover: derived.primaryColorHover,
      itemIconColorSelected: derived.primaryColor,
      itemIconColorChildSelected: derived.primaryColor,
      itemIconColorCollapsed: derived.textColor1Overlay,
      borderColorHorizontal: 'transparent',
      submenuArrowColor: derived.primaryColor
    }
  }
})
