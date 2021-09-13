import { commonDark } from '../../_styles/common'
import type { CardTheme } from './light'
import { self } from './light'

const cardDark: CardTheme = {
  name: 'Card',
  common: commonDark,
  self (vars) {
    const commonSelf = self(vars)
    const { cardColor } = vars
    commonSelf.colorEmbedded = cardColor
    return commonSelf
  }
}

export default cardDark
