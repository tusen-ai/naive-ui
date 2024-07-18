import { inputLight } from '../../input/styles'
import { buttonLight } from '../../button/styles'
import { commonLight } from '../../_styles/common'
import { createTheme } from '../../_mixins'
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
