import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  theme: 'light',
  name: 'Element',
  peer: [baseLight],
  getLocalVars (vars) {
    return vars
  }
})
