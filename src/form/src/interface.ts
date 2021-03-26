import { ErrorList, RuleItem, ValidateOption } from 'async-validator'
import { FormProps } from './Form'

export interface FormRules {
  [path: string]: FormRules | FormItemRule | FormItemRule[]
}

export type FormItemRuleValidator = (
  ...args: Parameters<RuleItem['validator'] & {}>
) => boolean | Error | Promise<boolean> | Promise<Error> | any

export type FormItemRule = RuleItem & {
  trigger?: ValidationTrigger | string
  validator?: FormItemRuleValidator
  asyncValidator?: FormItemRuleValidator
}

export interface FormItemValidateOptions {
  trigger?: ValidationTrigger | string
  callback?: ValidateCallback
  shouldRuleBeApplied?: ApplyRule
  options?: ValidateOption
}

export type FormItemInternalValidate = (
  trigger: ValidationTrigger | string | null | undefined,
  shouldRuleBeApplied?: ApplyRule,
  options?: ValidateOption
) => Promise<{
  valid: boolean
  errors?: ErrorList
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

export type FormInjection = FormProps

export type LabelAlign = 'left' | 'center' | 'right'
export type LabelPlacement = 'left' | 'top'
export type Size = 'small' | 'medium' | 'large'

export type ValidationTrigger = 'input' | 'change' | 'blur' | 'focus'

export type ApplyRule = (rule: FormItemRule) => boolean
export type ValidateCallback = (errors?: ErrorList) => void

export type FormValidateCallback = (errors?: ErrorList[]) => void
export type FormValidate = ((callback?: FormValidateCallback) => void) &
(() => Promise<void>)

export interface FormInst {
  validate: FormValidate
  restoreValidation: () => void
}
