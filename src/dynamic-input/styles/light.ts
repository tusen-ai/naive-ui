import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ButtonTheme } from '../../button/styles'
import type { InputTheme } from '../../input/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import commonVariables from './_common'

function self() {
  return commonVariables
}

export interface DynamicInputThemeVars extends ReturnType<typeof self> {}

const dynamicInputLight: DynamicInputTheme = createTheme({
  name: 'DynamicInput',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight
  },
  self
})

export interface DynamicInputTheme extends Theme<
  'DynamicInput',
  DynamicInputThemeVars,
  {
    Input: InputTheme
    Button: ButtonTheme
  }
> {}

export interface DynamicInputThemeOverrides extends ExtractThemeOverrides<DynamicInputTheme> {}

export default dynamicInputLight
