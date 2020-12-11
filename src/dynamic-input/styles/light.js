import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import {
  inputLight
} from '../../input/styles'
import {
  buttonLight
} from '../../button/styles'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'DynamicInput',
  peer: [
    baseLight,
    inputLight,
    buttonLight
  ],
  getLocalVars () {
    return {
      ...commonVariables
    }
  }
})
