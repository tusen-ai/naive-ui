import { commonDark } from '../../_styles/common'
import { self } from './light'
import type { ImageTheme } from './light'

const imageDark: ImageTheme = {
  name: 'Image',
  common: commonDark,
  self: (vars) => {
    const { textColor2 } = vars
    return {
      ...self(vars),
      iconColor: textColor2
    }
  }
}

export default imageDark
