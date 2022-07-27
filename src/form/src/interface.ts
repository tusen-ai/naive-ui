import { Ref, VNodeChild } from 'vue'
import {
  ValidateError,
  RuleItem,
  ValidateOption,
  ValidateMessages
} from 'async-validator'
import { FormSetupProps } from './Form'

export interface FormRules {
  [path: string]: FormRules | FormItemRule | FormItemRule[]
}

type SetRule<T, R> = T extends (rule: any, ...args: infer K) => infer P
  ? (rule: R, ...args: K) => P
  : never

export type FormItemRuleValidatorParams = Parameters<
SetRule<NonNullable<RuleItem['validator']>, FormItemRule>
>

export type FormItemRuleValidator = (
  ...args: FormItemRuleValidatorParams
) => boolean | Error | Error[] | Promise<void> | undefined

// In src of async-validator, any non-promise of asyncValidator will be abandoned
export type FormItemRuleAsyncValidator = (
  ...args: FormItemRuleValidatorParams
) => Promise<void> | undefined

export type FormItemRule = Omit<RuleItem, 'validator' | 'asyncValidator'> & {
  key?: string
  trigger?: ValidationTrigger | string | Array<ValidationTrigger | string>
  validator?: FormItemRuleValidator
  asyncValidator?: FormItemRuleAsyncValidator
  renderMessage?: () => VNodeChild
}

export interface FormItemValidateOptions {
  trigger?: ValidationTrigger | string
  callback?: ValidateCallback
  shouldRuleBeApplied?: ShouldRuleBeApplied
  options?: ValidateOption
}

export type FormItemInternalValidate = (
  trigger: ValidationTrigger | string | null | undefined,
  shouldRuleBeApplied?: ShouldRuleBeApplied,
  options?: ValidateOption
) => Promise<{
  valid: boolean
  errors?: ValidateError[]
}>

export type FormItemValidate = ((
  options: FormItemValidateOptions
) => Promise<void>) &
((trigger?: string, callback?: ValidateCallback) => Promise<void>)

export interface FormItemInst {
  validate: FormItemValidate
  restoreValidation: () => void
  path?: string
  internalValidate: FormItemInternalValidate
}

export type FormItemColRef = FormItemInst
export type FormItemRowRef = FormItemInst

export interface FormInjection {
  props: FormSetupProps
  maxChildLabelWidthRef: Ref<number | undefined>
  deriveMaxChildLabelWidth: (currentWidth: number) => void
}

export type LabelAlign = 'left' | 'center' | 'right'
export type LabelPlacement = 'left' | 'top'
export type Size = 'small' | 'medium' | 'large'

export type ValidationTrigger = 'input' | 'change' | 'blur' | 'focus'

export type ShouldRuleBeApplied = (rule: FormItemRule) => boolean
export type ValidateCallback = (errors?: ValidateError[]) => void

export type FormValidateCallback = (errors?: ValidateError[][]) => void
export type FormValidate = (
  callback?: FormValidateCallback,
  shouldRuleBeApplied?: ShouldRuleBeApplied
) => Promise<void>

export type FormValidationError = ValidateError[]

export interface FormInst {
  validate: FormValidate
  restoreValidation: () => void
}

export type FormValidationStatus = 'success' | 'error' | 'warning'

export interface FormValidateMessages extends ValidateMessages {}
