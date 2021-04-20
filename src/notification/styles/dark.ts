import { scrollbarDark } from '../../scrollbar/styles'
import { commonDark } from '../../_styles/common'
import type { NotificationTheme } from './light'
import { self } from './light'

const notificationDark: NotificationTheme = {
  name: 'Notification',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self
}

export default notificationDark
