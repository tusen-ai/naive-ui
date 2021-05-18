import { InjectionKey } from 'vue'
import { ErrorList, RuleItem, ValidateOption } from 'async-validator'
import { FormSetupProps } from './Form'

export interface FormRules {
  [path: string]: FormRules | FormItemRule | FormItemRule[]
}

export type FormItemRuleValidatorParams = Parameters<
NonNullable<RuleItem['validator']>
>

export type FormItemRuleValidator = (
  ...args: FormItemRuleValidatorParams
) => boolean | Error | Error[] | Promise<void> | undefined

// In src of async-validator, any non-promise of asyncValidator will be abadoned
export type FormItemRuleAsyncValidator = (
  ...args: FormItemRuleValidatorParams
) => Promise<void> | undefined

export type FormItemRule = Omit<RuleItem, 'validator' | 'asyncValidator'> & {
  trigger?: ValidationTrigger | string | Array<ValidationTrigger | string>
  validator?: FormItemRuleValidator
  asyncValidator?: FormItemRuleAsyncValidator
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

export type FormInjection = FormSetupProps

export const formInjectionKey: InjectionKey<FormInjection> = Symbol('form')
export const formItemInstsInjectionKey: InjectionKey<unknown> =
  Symbol('formItemInsts')

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
