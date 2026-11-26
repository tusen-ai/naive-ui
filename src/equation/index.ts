import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import { Equation as NEquationImpl } from './src/Equation'

export { equationProps } from './src/Equation'
export type { EquationProps } from './src/Equation'

export const NEquation: WithNativeAttrs<typeof NEquationImpl, HTMLAttributes>
  = NEquationImpl
