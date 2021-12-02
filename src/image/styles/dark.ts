import { commonDark } from '../../_styles/common'
import type { ImageTheme } from './light'

export const imageDark: ImageTheme = {
  name: 'Image',
  common: commonDark,
  self: (vars) => {
    const { textColor2 } = vars
    return {
      iconColor: textColor2
    }
  }
}
