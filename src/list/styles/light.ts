import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'

const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    cardColor,
    modalColor,
    dividerColorOverlay,
    borderRadius,
    fontSize
  } = vars
  return {
    textColor: textColor2,
    color: cardColor,
    colorModal: modalColor,
    borderColor: dividerColorOverlay,
    borderRadius,
    fontSize
  }
}

export type ListThemeVars = ReturnType<typeof self>

const listLight = {
  name: 'List',
  common: commonLight,
  self
}

export default listLight
export type ListTheme = typeof listLight
