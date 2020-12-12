import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  theme: 'dark',
  name: 'Affix',
  peer: [baseDark],
  getLocalVars () {
    return {}
  }
})
