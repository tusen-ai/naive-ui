import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { buttonLight } from '../../button/styles'

export default create({
  theme: 'light',
  name: 'ButtonGroup',
  peer: [baseLight, buttonLight],
  getLocalVars () {
    return {}
  }
})
