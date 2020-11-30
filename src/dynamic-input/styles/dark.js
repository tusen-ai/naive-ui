import create from '../../_styles/utils/create-component-base'
import inputStyle from '../../input/styles/light'
import buttonStyle from '../../button/styles/light'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'DynamicInput',
  peer: [
    inputStyle,
    buttonStyle
  ],
  getDerivedVars (vars) {
    return {
      ...commonVariables
    }
  }
})
