import create from '../../_styles/utils/create-component-base'
import { inputLight, buttonLight } from '../../styles'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'DynamicInput',
  peer: [
    inputLight,
    buttonLight
  ],
  getLocalVars () {
    return {
      ...commonVariables
    }
  }
})
