import commonVariables from './_common'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import type { TagTheme } from './light'

const tagDark: TagTheme = {
  name: 'Tag',
  common: commonDark,
  self (vars) {
    const {
      textColor2Overlay,
      primaryColorHover,
      primaryColorPressed,
      primaryColor,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      baseColor,
      borderColorOverlay,
      opacityDisabled,
      closeColorOverlay,
      closeColorHoverOverlay,
      closeColorPressedOverlay,
      borderRadiusSmall: borderRadius,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      heightTiny,
      heightSmall,
      heightMedium
    } = vars
    return {
      ...commonVariables,
      heightSmall: heightTiny,
      heightMedium: heightSmall,
      heightLarge: heightMedium,
      borderRadius,
      opacityDisabled,
      fontSizeSmall: fontSizeTiny,
      fontSizeMedium: fontSizeSmall,
      fontSizeLarge: fontSizeMedium,
      // checked
      textColorCheckable: textColor2Overlay,
      textColorHoverCheckable: primaryColorHover,
      textColorPressedCheckable: primaryColorPressed,
      textColorChecked: baseColor,
      colorCheckable: 'transparent',
      colorHoverCheckable: 'transparent',
      colorPressedCheckable: 'transparent',
      colorChecked: primaryColor,
      colorCheckedHover: primaryColorHover,
      colorCheckedPressed: primaryColorPressed,
      // default
      border: `1px solid ${borderColorOverlay}`,
      textColor: textColor2Overlay,
      color: 'transparent',
      closeColor: closeColorOverlay,
      closeColorHover: closeColorHoverOverlay,
      closeColorPressed: closeColorPressedOverlay,
      borderPrimary: `1px solid ${changeColor(primaryColor, { alpha: 0.3 })}`,
      textColorPrimary: primaryColor,
      colorPrimary: 'transparent',
      closeColorPrimary: changeColor(primaryColor, { alpha: 0.7 }),
      closeColorHoverPrimary: changeColor(primaryColor, { alpha: 0.85 }),
      closeColorPressedPrimary: changeColor(primaryColor, { alpha: 0.57 }),
      borderInfo: `1px solid ${changeColor(infoColor, { alpha: 0.3 })}`,
      textColorInfo: infoColor,
      colorInfo: 'transparent',
      closeColorInfo: changeColor(infoColor, { alpha: 0.7 }),
      closeColorHoverInfo: changeColor(infoColor, { alpha: 0.85 }),
      closeColorPressedInfo: changeColor(infoColor, { alpha: 0.57 }),
      borderSuccess: `1px solid ${changeColor(successColor, { alpha: 0.3 })}`,
      textColorSuccess: successColor,
      colorSuccess: 'transparent',
      closeColorSuccess: changeColor(successColor, { alpha: 0.7 }),
      closeColorHoverSuccess: changeColor(successColor, { alpha: 0.85 }),
      closeColorPressedSuccess: changeColor(successColor, { alpha: 0.57 }),
      borderWarning: `1px solid ${changeColor(warningColor, { alpha: 0.3 })}`,
      textColorWarning: warningColor,
      colorWarning: 'transparent',
      closeColorWarning: changeColor(warningColor, { alpha: 0.7 }),
      closeColorHoverWarning: changeColor(warningColor, { alpha: 0.85 }),
      closeColorPressedWarning: changeColor(warningColor, { alpha: 0.57 }),
      borderError: `1px solid ${changeColor(errorColor, { alpha: 0.3 })}`,
      textColorError: errorColor,
      colorError: 'transparent',
      closeColorError: changeColor(errorColor, { alpha: 0.7 }),
      closeColorHoverError: changeColor(errorColor, { alpha: 0.85 }),
      closeColorPressedError: changeColor(errorColor, { alpha: 0.57 })
    }
  }
}

export default tagDark
