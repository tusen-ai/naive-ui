import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Card',
  peer: [baseLight, iconLight],
  getLocalVars (vars) {
    const { borderRadius, lineHeight, fontSize } = vars
    return {
      ...commonVariables,
      lineHeight,
      color: vars.cardColor,
      textColor: vars.textColor2,
      titleTextColor: vars.textColor1,
      borderColor: vars.dividerColorOverlay,
      actionColor: vars.actionColorOverlay,
      titleFontWeight: vars.fontWeightStrong,
      closeColor: vars.closeColor,
      closeColorHover: vars.closeColorHover,
      closeColorPressed: vars.closeColorPressed,
      fontSizeSmall: fontSize,
      fontSizeMedium: fontSize,
      fontSizeLarge: fontSize,
      fontSizeHuge: fontSize,
      borderRadius
    }
  }
})
