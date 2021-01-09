import { inputDark } from '../../input/styles'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/new-common'
import { iconDark } from '../../icon/styles'
import commonVariables from './_common'

export default {
  name: 'DynamicInput',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    Icon: iconDark
  },
  self () {
    return {
      ...commonVariables
    }
  }
}
