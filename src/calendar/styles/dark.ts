import { commonDark } from '../../_styles/common'
import type { CalendarTheme } from './light'
import { self } from './light'
import { buttonDark } from '../../button/styles'

const calendarDark: CalendarTheme = {
  name: 'Calendar',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
  self
}

export default calendarDark
