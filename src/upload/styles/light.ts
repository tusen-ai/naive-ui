import { changeColor } from 'seemly'
import { buttonLight } from '../../button/styles'
import { progressLight } from '../../progress/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    iconColorOverlay,
    primaryColor,
    errorColor,
    textColor2,
    successColor,
    opacityDisabled,
    actionColorOverlay,
    borderColor,
    hoverColorOverlay,
    lineHeight,
    borderRadius,
    fontSize
  } = vars
  return {
    fontSize,
    lineHeight,
    borderRadius,
    draggerColor: actionColorOverlay,
    draggerBorder: `1px dashed ${borderColor}`,
    draggerBorderHover: `1px dashed ${primaryColor}`,
    itemColorHover: hoverColorOverlay,
    itemColorHoverError: changeColor(errorColor, {
      alpha: 0.06
    }),
    itemTextColor: textColor2,
    itemTextColorError: errorColor,
    itemTextColorSuccess: successColor,
    itemIconColor: iconColorOverlay,
    itemDisabledOpacity: opacityDisabled
  }
}

export type UploadThemeVars = ReturnType<typeof self>

const uploadLight = createTheme({
  name: 'Upload',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Progress: progressLight
  },
  self
})

export default uploadLight
export type UploadTheme = typeof uploadLight
