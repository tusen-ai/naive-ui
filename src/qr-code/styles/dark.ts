import type { QrCodeTheme } from './light'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'

const qrcodeDark: QrCodeTheme = {
  name: 'QrCode',
  common: commonDark,
  self: (vars) => {
    const { borderRadius, cardColor, textColor2, primaryColor } = vars
    return {
      borderRadius,
      maskColor: changeColor(cardColor, { alpha: 0.96 }),
      statusTextColor: textColor2,
      refreshTextColor: primaryColor
    }
  }
}

export default qrcodeDark
