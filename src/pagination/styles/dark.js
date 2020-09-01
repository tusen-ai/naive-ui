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
      disabledBackgroundColor,
      disabledTextOverlayColor,
      borderOverlayColor,
      tertiaryOpacity
    } = derived
    const {
      borderRadius
    } = base
    return {
      itemTextColorDefault: secondaryTextOverlayColor,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: disabledTextOverlayColor,
      itemBackgroundColorDefault: 'transparent',
      itemBackgroundColorActive: 'transparent',
      itemBackgroundColorDisabled: disabledBackgroundColor,
      itemBorderColorDefault: borderOverlayColor,
      itemBorderColorActive: changeColor(primaryColor, { alpha: tertiaryOpacity }),
      itemBorderColorDisabled: 'transparent',
      textColorDefault: secondaryTextOverlayColor,
      textColorDisabled: secondaryTextOverlayColor,
      borderRadius: borderRadius
    }
  }
})
