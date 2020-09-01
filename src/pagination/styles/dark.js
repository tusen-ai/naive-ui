import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'
import suffixStyle from '../../_base/suffix/styles/dark'

export default create({
  name: 'Pagination',
  theme: 'dark',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      primaryColor,
      disabledInputBackgroundOverlayColor,
      disabledTextOverlayColor,
      borderOverlayColor,
      tertiaryOpacity
    } = derived
    const {
      borderRadius
    } = base
    return {
      itemTextColor: secondaryTextOverlayColor,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: disabledTextOverlayColor,
      itemColor: 'transparent',
      itemColorActive: 'transparent',
      itemColorDisabled: disabledInputBackgroundOverlayColor,
      itemBorderColor: borderOverlayColor,
      itemBorderColorActive: changeColor(primaryColor, { alpha: tertiaryOpacity }),
      itemBorderColorDisabled: 'transparent',
      itemBorderRadius: borderRadius,
      jumperTextColor: secondaryTextOverlayColor,
      jumperTextColorDisabled: disabledTextOverlayColor
    }
  }
})
