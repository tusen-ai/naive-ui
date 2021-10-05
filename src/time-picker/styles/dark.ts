import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { inputDark } from '../../input/styles'
import type { TimePickerTheme } from './light'
import { self } from './light'

const timePickerDark: TimePickerTheme = {
  name: 'TimePicker',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Button: buttonDark,
    Input: inputDark
  },
  self
}

export default timePickerDark
