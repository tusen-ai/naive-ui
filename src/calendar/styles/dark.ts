import type { CalendarTheme } from './light'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { self } from './light'

const calendarDark: CalendarTheme = {
  name: 'Calendar',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
  self
}

export default calendarDark
