import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import commonVariables from './_common'

function self() {
  return commonVariables
}

export type DynamicInputThemeVars = ReturnType<typeof self>

const dynamicInputLight = createTheme({
  name: 'DynamicInput',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight
  },
  self
})

export default dynamicInputLight
export type DynamicInputTheme = typeof dynamicInputLight
