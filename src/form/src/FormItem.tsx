import {
  h,
  defineComponent,
  computed,
  toRef,
  PropType,
  CSSProperties,
  ExtractPropTypes,
  ref,
  provide,
  inject,
  watch,
  Transition,
  renderSlot
} from 'vue'
import Schema, { ErrorList, RuleItem, ValidateOption } from 'async-validator'
import { get } from 'lodash-es'
import { createId } from 'seemly'
import { formItemInjectionKey } from '../../_mixins/use-form-item'
import { ThemeProps, useConfig, useTheme } from '../../_mixins'
import {
  warn,
  createKey,
  useInjectionInstanceCollection,
  keysOf
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { formLight, FormTheme } from '../styles'
import { formItemMisc, formItemSize, formItemRule } from './utils'
import Feedbacks from './Feedbacks'
import style from './styles/form-item.cssr'
import {
  ApplyRule,
  FormItemRule,
  LabelAlign,
  LabelPlacement,
  ValidateCallback,
  ValidationTrigger,
  FormItemRuleValidatorParams,
  FormItemRuleValidator,
  FormItemValidateOptions,
  FormItemInst,
  FormItemInternalValidate,
  formItemInstsInjectionKey,
  formInjectionKey
} from './interface'

export const formItemProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  label: {
    type: [String, Boolean] as PropType<string | false | undefined>,
    default: undefined
  },
  labelWidth: [Number, String] as PropType<string | number>,
  labelStyle: [String, Object] as PropType<CSSProperties | string>,
  labelAlign: String as PropType<LabelAlign>,
  labelPlacement: String as PropType<LabelPlacement>,
  path: String,
  first: {
    type: Boolean,
    default: false
  },
  rulePath: String,
  required: {
    type: Boolean,
    default: false
  },
  showRequireMark: {
    type: [Boolean, String] as PropType<'left' | 'right' | boolean>,
    default: undefined
  },
  showFeedback: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  rule: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  ignorePathChange: {
    type: Boolean,
    default: false
  },
  validationStatus: String as PropType<'error' | 'warning' | 'success'>,
  feedback: String
} as const

export type FormItemSetupProps = ExtractPropTypes<typeof formItemProps>
export type FormItemProps = ExtractPublicPropTypes<typeof formItemProps>
export const formItemPropKeys = keysOf(formItemProps)

// Wrapped Validator is to be passed into async-validator
// In their source code, validator can be a asyncValidator.
// asyncValidator will non-promise return value will be ignored.
// We need to deal with some type quirks.
type WrappedValidator = (
  ...args: FormItemRuleValidatorParams
) => boolean | Error | Error[] | Promise<void> | undefined

// wrap sync validator
function wrapValidator (
  validator: FormItemRuleValidator,
  async: boolean
): WrappedValidator {
  return (...args: Parameters<FormItemRuleValidator>) => {
    try {
      const validateResult = validator(...args)
      if (
        (!async &&
          (typeof validateResult === 'boolean' ||
            validateResult instanceof Error ||
            Array.isArray(validateResult))) || // Error[]
        (validateResult as any)?.then
      ) {
        return validateResult as any
      } else if (validateResult === undefined) {
        return true
      } else {
        warn(
          'form-item/validate',
          `You return a ${typeof validateResult} ` +
            'typed value in the validator method, which is not recommended. Please use ' +
            (async ? '`Promise`' : '`boolean`, `Error` or `Promise`') +
            ' typed value instead.'
        )
        return true
      }
    } catch (err) {
      warn(
        'form-item/validate',
        'An error is catched in the validation, ' +
          "so the validation won't be done. Your callback in `validate` method of " +
          "`n-form` or `n-form-item` won't be called in this validation."
      )
      console.error(err)
      // If returns undefined, async-validator won't trigger callback
      // so the result will be abandoned, which means not true and not false
      return undefined
    }
  }
}

export default defineComponent({
  name: 'FormItem',
  props: formItemProps,
  setup (props) {
    useInjectionInstanceCollection(
      formItemInstsInjectionKey,
      'formItems',
      toRef(props, 'path')
    )
    const { mergedClsPrefixRef } = useConfig(props)
    const NForm = inject(formInjectionKey, null)
    const formItemSizeRefs = formItemSize(props)
    const formItemMiscRefs = formItemMisc(props)
    const { validationErrored: validationErroredRef } = formItemMiscRefs
    const { mergedRequired: mergedRequiredRef, mergedRules: mergedRulesRef } =
      formItemRule(props)
    const { mergedSize: mergedSizeRef } = formItemSizeRefs
    const { mergedLabelPlacement: labelPlacementRef } = formItemMiscRefs
    const explainsRef = ref<string[]>([])
    const feedbackIdRef = ref(createId())
    const hasFeedbackRef = computed(() => {
      const { feedback } = props
      if (feedback !== undefined && feedback !== null) return true
      return explainsRef.value.length
    })
    const themeRef = useTheme(
      'Form',
      'FormItem',
      style,
      formLight,
      props,
      mergedClsPrefixRef
    )
    watch(toRef(props, 'path'), () => {
      if (props.ignorePathChange) return
      restoreValidation()
    })
    function restoreValidation (): void {
      explainsRef.value = []
      validationErroredRef.value = false
      if (props.feedback) {
        feedbackIdRef.value = createId()
      }
    }
    function handleContentBlur (): void {
      void internalValidate('blur')
    }
    function handleContentChange (): void {
      void internalValidate('change')
    }
    function handleContentFocus (): void {
      void internalValidate('focus')
    }
    function handleContentInput (): void {
      void internalValidate('input')
    }
    // Resolve : ()
    // Reject  : (errors: AsyncValidator.ErrorList)
    async function validate (options: FormItemValidateOptions): Promise<void>
    async function validate (
      trigger?: string | null,
      callback?: ValidateCallback
    ): Promise<void>
    async function validate (
      options?: string | null | FormItemValidateOptions,
      callback?: ValidateCallback
    ): Promise<void> {
      /** the following code is for compatibility */
      let trigger: ValidationTrigger | string | undefined
      let validateCallback: ValidateCallback | undefined
      let shouldRuleBeApplied: ApplyRule | undefined
      let asyncValidatorOptions: {} | undefined
      if (typeof options === 'string') {
        trigger = options
        validateCallback = callback
      } else if (options !== null && typeof options === 'object') {
        trigger = options.trigger
        validateCallback = options.callback
        shouldRuleBeApplied = options.shouldRuleBeApplied
        asyncValidatorOptions = options.options
      }
      return await new Promise((resolve, reject) => {
        void internalValidate(
          trigger,
          shouldRuleBeApplied,
          asyncValidatorOptions
        ).then(({ valid, errors }) => {
          if (valid) {
            if (validateCallback) {
              validateCallback()
            }
            resolve()
          } else {
            if (validateCallback) {
              validateCallback(errors)
            }
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(errors)
          }
        })
      })
    }
    const internalValidate: FormItemInternalValidate = async (
      trigger: ValidationTrigger | string | null = null,
      shouldRuleBeApplied: ApplyRule = () => true,
      options: ValidateOption = {
        suppressWarning: true
      }
    ): Promise<{
      valid: boolean
      errors?: ErrorList
    }> => {
      const { path } = props
      if (!options) {
        options = {}
      } else {
        if (!options.first) options.first = props.first
      }
      const { value: rules } = mergedRulesRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const value = NForm ? get(NForm.model, path!, null) : undefined
      const activeRules = (
        !trigger
          ? rules
          : rules.filter((rule) => {
            // if (rule.trigger === undefined) return true
            if (Array.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger)
            } else {
              return rule.trigger === trigger
            }
          })
      )
        .filter(shouldRuleBeApplied)
        .map((rule) => {
          const shallowClonedRule = Object.assign({}, rule)
          if (shallowClonedRule.validator) {
            shallowClonedRule.validator = wrapValidator(
              shallowClonedRule.validator,
              false
            )
          }
          if (shallowClonedRule.asyncValidator) {
            shallowClonedRule.asyncValidator = wrapValidator(
              shallowClonedRule.asyncValidator,
              true
            ) as any
          }
          return shallowClonedRule
        })
      if (!activeRules.length) {
        return Promise.resolve({
          valid: true
        })
      }
      const mergedPath = path ?? '__n_no_path__'
      const validator = new Schema({ [mergedPath]: activeRules as RuleItem[] })
      return new Promise((resolve) => {
        void validator.validate(
          { [mergedPath]: value },
          options,
          (errors, fields) => {
            if (errors?.length) {
              explainsRef.value = errors.map((error) => error.message)
              validationErroredRef.value = true
              resolve({
                valid: false,
                errors
              })
            } else {
              restoreValidation()
              resolve({
                valid: true
              })
            }
          }
        )
      })
    }
    provide(formItemInjectionKey, {
      path: toRef(props, 'path'),
      mergedSize: formItemSizeRefs.mergedSize,
      restoreValidation,
      handleContentBlur,
      handleContentChange,
      handleContentFocus,
      handleContentInput
    })
    const exposedRef: FormItemInst = {
      validate,
      restoreValidation,
      internalValidate
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRequired: mergedRequiredRef,
      hasFeedback: hasFeedbackRef,
      feedbackId: feedbackIdRef,
      explains: explainsRef,
      ...formItemMiscRefs,
      ...formItemSizeRefs,
      ...exposedRef,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const { value: labelPlacement } = labelPlacementRef
        const direction = labelPlacement === 'top' ? 'vertical' : 'horizontal'
        const {
          common: { cubicBezierEaseInOut },
          self: {
            labelTextColor,
            asteriskColor,
            lineHeight,
            feedbackTextColor,
            feedbackTextColorWarning,
            feedbackTextColorError,
            feedbackPadding,
            [createKey('labelHeight', size)]: labelHeight,
            [createKey('blankHeight', size)]: blankHeight,
            [createKey('feedbackFontSize', size)]: feedbackFontSize,
            [createKey('feedbackHeight', size)]: feedbackHeight,
            [createKey('labelPadding', direction)]: labelPadding,
            [createKey('labelTextAlign', direction)]: labelTextAlign,
            [createKey(createKey('labelFontSize', labelPlacement), size)]:
              labelFontSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--line-height': lineHeight,
          '--blank-height': blankHeight,
          '--label-font-size': labelFontSize,
          '--label-height': labelHeight,
          '--label-padding': labelPadding,
          '--asterisk-color': asteriskColor,
          '--label-text-color': labelTextColor,
          '--feedback-padding': feedbackPadding,
          '--feedback-font-size': feedbackFontSize,
          '--feedback-height': feedbackHeight,
          '--feedback-text-color': feedbackTextColor,
          '--feedback-text-color-warning': feedbackTextColorWarning,
          '--feedback-text-color-error': feedbackTextColorError,
          '--label-text-align': labelTextAlign
        }
      })
    }
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-form-item`,
          `${mergedClsPrefix}-form-item--${this.mergedSize}-size`,
          `${mergedClsPrefix}-form-item--${this.mergedLabelPlacement}-labelled`,
          this.label === false && `${mergedClsPrefix}-form-item--no-label`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.label || $slots.label ? (
          <label
            class={`${mergedClsPrefix}-form-item-label`}
            style={this.mergedLabelStyle as any}
          >
            {/* undefined || 'right' || true || false */}
            {this.mergedShowRequireMark !== 'left'
              ? renderSlot($slots, 'label', undefined, () => [this.label])
              : null}
            {(
              this.mergedShowRequireMark !== undefined
                ? this.mergedShowRequireMark
                : this.mergedRequired
            ) ? (
              <span class={`${mergedClsPrefix}-form-item-label__asterisk`}>
                {this.mergedShowRequireMark !== 'left' ? '\u00A0*' : '*\u00A0'}
              </span>
                ) : null}
            {this.mergedShowRequireMark === 'left'
              ? renderSlot($slots, 'label', undefined, () => [this.label])
              : null}
          </label>
        ) : null}
        <div
          class={[
            `${mergedClsPrefix}-form-item-blank`,
            this.mergedValidationStatus &&
              `${mergedClsPrefix}-form-item-blank--${this.mergedValidationStatus}`
          ]}
        >
          {$slots}
        </div>
        {this.mergedShowFeedback ? (
          <div
            key={this.feedbackId}
            class={`${mergedClsPrefix}-form-item-feedback-wrapper`}
          >
            <Transition name="fade-down-transition" mode="out-in">
              {{
                default: () => {
                  const feedbacks = (
                    <Feedbacks
                      clsPrefix={mergedClsPrefix}
                      explains={this.explains}
                      feedback={this.feedback}
                    />
                  )
                  const { hasFeedback, mergedValidationStatus } = this
                  return hasFeedback ? (
                    mergedValidationStatus === 'warning' ? (
                      <div
                        key="controlled-warning"
                        class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--warning`}
                      >
                        {feedbacks}
                      </div>
                    ) : mergedValidationStatus === 'error' ? (
                      <div
                        key="controlled-error"
                        class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--error`}
                      >
                        {feedbacks}
                      </div>
                    ) : mergedValidationStatus === 'success' ? (
                      <div
                        key="controlled-success"
                        class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--success`}
                      >
                        {feedbacks}
                      </div>
                    ) : (
                      <div
                        key="controlled-default"
                        class={`${mergedClsPrefix}-form-item-feedback`}
                      >
                        {feedbacks}
                      </div>
                    )
                  ) : null
                }
              }}
            </Transition>
          </div>
        ) : null}
      </div>
    )
  }
})
