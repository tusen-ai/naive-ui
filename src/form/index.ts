import type { FormHTMLAttributes, HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NFormImpl from './src/Form'
import NFormItemImpl from './src/FormItem'
import NFormItemColImpl from './src/FormItemCol'
import NFormItemGiImpl from './src/FormItemGridItem'
import NFormItemRowImpl from './src/FormItemRow'

export { formProps } from './src/Form'
export type { FormProps } from './src/Form'
export { formItemProps } from './src/FormItem'
export type { FormItemProps } from './src/FormItem'
export type { FormItemColProps } from './src/FormItemCol'
export {
  formItemGiProps,
  formItemGiProps as formItemGridItemProps
} from './src/FormItemGridItem'

export type {
  FormItemGiProps,
  FormItemGiProps as FormItemGridItemProps
} from './src/FormItemGridItem'
export type { FormItemRowProps } from './src/FormItemRow'
export type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
  FormValidateFilter,
  FormValidateOptions,
  FormValidationError
} from './src/interface'

export type * from './src/public-types'

export const NForm: WithNativeAttrs<typeof NFormImpl, FormHTMLAttributes>
  = NFormImpl
export const NFormItem: WithNativeAttrs<typeof NFormItemImpl, HTMLAttributes>
  = NFormItemImpl
// deprecated
export const NFormItemCol: WithNativeAttrs<
  typeof NFormItemColImpl,
  HTMLAttributes
> = NFormItemColImpl
export const NFormItemGi: WithNativeAttrs<
  typeof NFormItemGiImpl,
  HTMLAttributes
> = NFormItemGiImpl
export const NFormItemGridItem: typeof NFormItemGi = NFormItemGi
export const NFormItemRow: WithNativeAttrs<
  typeof NFormItemRowImpl,
  HTMLAttributes
> = NFormItemRowImpl
