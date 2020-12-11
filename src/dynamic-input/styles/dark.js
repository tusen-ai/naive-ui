import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import {
  inputDark
} from '../../input'
import {
  buttonDark
} from '../../button'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'DynamicInput',
  peer: [
    baseDark,
    inputDark,
    buttonDark
  ],
  getLocalVars () {
    return {
      ...commonVariables
    }
  }
})
