import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { buttonDark } from '../../button'

export default create({
  theme: 'dark',
  name: 'ButtonGroup',
  peer: [
    baseDark,
    buttonDark
  ],
  getLocalVars () {
    return {}
  }
})
