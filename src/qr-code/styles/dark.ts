import type { QrCodeTheme } from './light'
import { commonDark } from '../../_styles/common'

const qrcodeDark: QrCodeTheme = {
  name: 'QrCode',
  common: commonDark,
  self: (vars) => {
    return {
      borderRadius: vars.borderRadius
    }
  }
}

export default qrcodeDark
