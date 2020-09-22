import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'Alert',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      fontWeightStrong
    } = base
    const {
      dividerColorOverlay,
      inputColorOverlay,
      textColorPrimaryOverlay,
      textColorSecondaryOverlay,
      closeColorOverlay,
      colorColorHoverOverlay,
      closeColorPressedOverlay,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl
    } = derived
    return {
      titleFontWeight: fontWeightStrong,
      borderRadius,
      default: {
        borderColor: dividerColorOverlay,
        color: inputColorOverlay,
        titleTextColor: textColorPrimaryOverlay,
        iconColor: textColorSecondaryOverlay,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      info: {
        borderColor: changeColor(infoColorSuppl, { alpha: 0.35 }),
        color: changeColor(infoColorSuppl, { alpha: 0.25 }),
        titleTextColor: textColorPrimaryOverlay,
        iconColor: infoColorSuppl,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      success: {
        borderColor: changeColor(successColorSuppl, { alpha: 0.35 }),
        color: changeColor(successColorSuppl, { alpha: 0.25 }),
        titleTextColor: textColorPrimaryOverlay,
        iconColor: successColorSuppl,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      warning: {
        borderColor: changeColor(warningColorSuppl, { alpha: 0.35 }),
        color: changeColor(warningColorSuppl, { alpha: 0.25 }),
        titleTextColor: textColorPrimaryOverlay,
        iconColor: warningColorSuppl,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      error: {
        borderColor: changeColor(errorColorSuppl, { alpha: 0.35 }),
        color: changeColor(errorColorSuppl, { alpha: 0.25 }),
        titleTextColor: textColorPrimaryOverlay,
        iconColor: errorColorSuppl,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      }
    }
  }
})
