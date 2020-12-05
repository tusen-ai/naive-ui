import create from '../../_styles/utils/create-component-base'
import { inputDark, buttonDark } from '../../styles'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'DynamicInput',
  peer: [
    inputDark,
    buttonDark
  ],
  getLocalVars () {
    return {
      ...commonVariables
    }
  }
})
