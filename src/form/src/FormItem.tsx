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
import Schema, { ErrorList, ValidateOption } from 'async-validator'
import { get } from 'lodash-es'
import { createId } from 'seemly'
import type { FormItemInjection } from '../../_mixins/use-form-item'
import type { ThemeProps } from '../../_mixins'
import { useTheme } from '../../_mixins'
import {
  warn,
  createKey,
  useInjectionInstanceCollection,
  keysOf
} from '../../_utils'
import { formLight, FormTheme } from '../styles'
import { formItemMisc, formItemSize, formItemRule } from './utils'
import Feedbacks from './Feedbacks'
import style from './styles/form-item.cssr'
import {
  ApplyRule,
  FormInjection,
  FormItemRule,
  LabelAlign,
  LabelPlacement,
  ValidateCallback,
  ValidationTrigger,
  FormItemRuleValidator,
  FormItemValidateOptions,
  FormItemRef,
  FormItemInternalValidate
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
    type: Boolean as PropType<boolean | undefined>,
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

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export const formItemPropKeys = keysOf(formItemProps)

// Wrapped Validator is to be passed into async-validator
type WrappedValidator = (
  ...args: Parameters<FormItemRuleValidator>
) => boolean | Error | Promise<boolean | Error> | undefined
function wrapValidator (validator: FormItemRuleValidator): WrappedValidator {
  return (...args: Parameters<FormItemRuleValidator>) => {
    try {
      const validateResult = validator(...args)
      if (
        typeof validateResult === 'boolean' ||
        validateResult instanceof Error ||
        validateResult?.then
      ) {
        return validateResult
      } else if (validateResult === undefined) {
        return true
      } else {
        warn(
          'form-item/validate',
          `You return a ${typeof validateResult} ` +
            'typed value in the validator method, which is not recommended. Please ' +
            'use `boolean`, `Error` or `Promise` typed value instead.'
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
      return undefined
    }
  }
}

export default defineComponent({
  name: 'FormItem',
  props: formItemProps,
  setup (props) {
    useInjectionInstanceCollection(
      'NFormRules',
      'formItems',
      toRef(props, 'path')
    )
    const NForm = inject<FormInjection | null>('NForm', null)
    const formItemSizeRefs = formItemSize(props)
    const formItemMiscRefs = formItemMisc(props)
    const { validationErrored: validationErroredRef } = formItemMiscRefs
    const {
      mergedRequired: mergedRequiredRef,
      mergedRules: mergedRulesRef
    } = formItemRule(props)
    const { mergedSize: mergedSizeRef } = formItemSizeRefs
    const { mergedLabelPlacement: labelPlacementRef } = formItemMiscRefs
    const explainsRef = ref<string[]>([])
    const feedbackIdRef = ref(createId())
    const hasFeedbackRef = computed(() => {
      const { feedback } = props
      if (feedback !== undefined && feedback !== null) return true
      return explainsRef.value.length
    })
    const themeRef = useTheme('Form', 'FormItem', style, formLight, props)
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
      // If no path or NForm is specified, not data will be validated, so any
      // value will be valid.
      if (!path || !NForm) {
        return Promise.resolve({
          valid: true
        })
      }
      if (!options) {
        options = {}
      } else {
        if (!options.first) options.first = props.first
      }
      const { value: rules } = mergedRulesRef
      const value = get(NForm.model, path, null)
      const activeRules = (!trigger
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
              shallowClonedRule.validator
            )
          }
          if (shallowClonedRule.asyncValidator) {
            shallowClonedRule.asyncValidator = wrapValidator(
              shallowClonedRule.asyncValidator
            ) as any
          }
          return shallowClonedRule
        })
      if (!activeRules.length) {
        return Promise.resolve({
          valid: true
        })
      }
      const validator = new Schema({ [path]: activeRules })
      return new Promise((resolve, reject) => {
        void validator.validate(
          { [path]: value },
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
    provide<FormItemInjection>('NFormItem', {
      mergedSize: formItemSizeRefs.mergedSize,
      restoreValidation,
      handleContentBlur,
      handleContentChange,
      handleContentFocus,
      handleContentInput
    })
    const exposedRef: FormItemRef = {
      validate,
      restoreValidation,
      internalValidate
    }
    return {
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
            [createKey(
              createKey('labelFontSize', labelPlacement),
              size
            )]: labelFontSize
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
    const { $slots } = this
    return (
      <div
        class={[
          'n-form-item',
          [
            `n-form-item--${this.mergedSize}-size`,
            `n-form-item--${this.mergedLabelPlacement}-labelled`,
            this.label === false && 'n-form-item--no-label'
          ]
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.label || $slots.label ? (
          <label class="n-form-item-label" style={this.mergedLabelStyle as any}>
            {renderSlot($slots, 'label', undefined, () => [this.label])}
            {(
              this.mergedShowRequireMark !== undefined
                ? this.mergedShowRequireMark
                : this.mergedRequired
            ) ? (
                <span class="n-form-item-label__asterisk">&nbsp;*</span>
              ) : null}
          </label>
        ) : null}

        <div
          class={[
            'n-form-item-blank',
            this.mergedValidationStatus &&
              `n-form-item-blank--${this.mergedValidationStatus}`
          ]}
        >
          {$slots}
        </div>
        {this.mergedShowFeedback ? (
          <div key={this.feedbackId} class="n-form-item-feedback-wrapper">
            <Transition name="n-fade-down-transition" mode="out-in">
              {{
                default: () => {
                  const feedbacks = (
                    <Feedbacks
                      explains={this.explains}
                      feedback={this.feedback}
                    />
                  )
                  const { hasFeedback, mergedValidationStatus } = this
                  return hasFeedback ? (
                    mergedValidationStatus === 'warning' ? (
                      <div
                        key="controlled-warning"
                        class="n-form-item-feedback n-form-item-feedback--warning"
                      >
                        {feedbacks}
                      </div>
                    ) : mergedValidationStatus === 'error' ? (
                      <div
                        key="controlled-error"
                        class="n-form-item-feedback n-form-item-feedback--error"
                      >
                        {feedbacks}
                      </div>
                    ) : mergedValidationStatus === 'success' ? (
                      <div
                        key="controlled-success"
                        class="n-form-item-feedback n-form-item-feedback--success"
                      >
                        {feedbacks}
                      </div>
                    ) : (
                      <div
                        key="controlled-default"
                        class="n-form-item-feedback"
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
