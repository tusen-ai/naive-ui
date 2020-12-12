import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  theme: 'light',
  name: 'Affix',
  peer: [baseLight],
  getLocalVars () {
    return {}
  }
})
