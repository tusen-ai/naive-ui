import type { ModalTheme } from './light'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { cardDark } from '../../card/styles'
import { dialogDark } from '../../dialog/styles'
import { self } from './light'

const modalDark: ModalTheme = {
  name: 'Modal',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Dialog: dialogDark,
    Card: cardDark
  },
  self
}

export default modalDark
