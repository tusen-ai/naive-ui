import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NStepImpl from './src/Step'
import NStepsImpl from './src/Steps'

export { stepProps } from './src/Step'
export type { StepProps, StepSlots } from './src/Step'
export { stepsProps } from './src/Steps'
export type { StepsProps, StepsSlots } from './src/Steps'

export const NStep: WithNativeAttrs<typeof NStepImpl, HTMLAttributes>
  = NStepImpl
export const NSteps: WithNativeAttrs<typeof NStepsImpl, HTMLAttributes>
  = NStepsImpl
