import type { ImageTheme } from './light'
import { commonDark } from '../../_styles/common'
import { tooltipDark } from '../../styles'

export const imageDark: ImageTheme = {
  name: 'Image',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark
  },
  self: (vars) => {
    const { textColor2 } = vars
    return {
      toolbarIconColor: textColor2,
      toolbarColor: 'rgba(0, 0, 0, .35)',
      toolbarBoxShadow: 'none',
      toolbarBorderRadius: '24px'
    }
  }
}
