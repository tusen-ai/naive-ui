import create from '../../_styles/utils/create-component-base'
import {
  tagLight
} from '../../tag'
import { baseLight } from '../../_styles/base'
import {
  inputLight
} from '../../input'
import {
  buttonLight
} from '../../button'

export default create({
  name: 'DynamicTags',
  theme: 'light',
  peer: [
    baseLight,
    inputLight,
    buttonLight,
    tagLight
  ],
  getLocalVars (vars) {
    return {}
  }
})
