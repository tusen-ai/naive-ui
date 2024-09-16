import {
  type CSSProperties,
  type ExtractPropTypes,
  type LabelHTMLAttributes,
  type PropType,
  type Slot,
  Transition,
  type VNodeChild,
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  provide,
  ref,
  toRef,
  watch
} from 'vue'
import Schema from 'async-validator'
import type { RuleItem, ValidateError, ValidateOption } from 'async-validator'
import { get } from 'lodash-es'
import { createId } from 'seemly'
import { formItemInjectionKey } from '../../_mixins/use-form-item'
import {
  type ThemeProps,
  useConfig,
  useTheme,
  useThemeClass
} from '../../_mixins'
import {
  createKey,
  keysOf,
  resolveWrappedSlot,
  useInjectionInstanceCollection,
  warn
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { type FormTheme, formLight } from '../styles'
import { formItemMisc, formItemRule, formItemSize } from './utils'
import type {
  FormItemInst,
  FormItemInternalValidate,
  FormItemInternalValidateResult,
  FormItemRule,
  FormItemRuleValidator,
  FormItemRuleValidatorParams,
  FormItemValidateOptions,
  LabelAlign,
  LabelPlacement,
  ShouldRuleBeApplied,
  ValidateCallback,
  ValidationTrigger
} from './interface'
import { formInjectionKey, formItemInstsInjectionKey } from './context'
import style from './styles/form-item.cssr'

export const formItemProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  label: String,
  labelWidth: [Number, String] as PropType<string | number>,
  labelStyle: [String, Object] as PropType<CSSProperties | string>,
  labelAlign: String as PropType<LabelAlign>,
  labelPlacement: String as PropType<LabelPlacement>,
  path: String,
  first: Boolean,
  rulePath: String,
  required: Boolean,
  showRequireMark: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  requireMarkPlacement: String as PropType<'left' | 'right' | 'right-hanging'>,
  showFeedback: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  rule: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  ignorePathChange: Boolean,
  validationStatus: String as PropType<'error' | 'warning' | 'success'>,
  feedback: String,
  feedbackClass: String,
  feedbackStyle: [String, Object] as PropType<string | CSSProperties>,
  showLabel: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  labelProps: Object as PropType<LabelHTMLAttributes>
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
function wrapValidator(
  validator: FormItemRuleValidator,
  async: boolean
): WrappedValidator {
  return (...args: Parameters<FormItemRuleValidator>) => {
    try {
      const validateResult = validator(...args)
      if (
        (!async
          && (typeof validateResult === 'boolean'
            || validateResult instanceof Error
            || Array.isArray(validateResult))) // Error[]
            || (validateResult as any)?.then
      ) {
        return validateResult as any
      }
      else if (validateResult === undefined) {
        return true
      }
      else {
        warn(
          'form-item/validate',
          `You return a ${typeof validateResult} `
          + `typed value in the validator method, which is not recommended. Please use ${
            async ? '`Promise`' : '`boolean`, `Error` or `Promise`'
          } typed value instead.`
        )
        return true
      }
    }
    catch (err) {
      warn(
        'form-item/validate',
        'An error is catched in the validation, '
        + 'so the validation won\'t be done. Your callback in `validate` method of '
        + '`n-form` or `n-form-item` won\'t be called in this validation.'
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
  setup(props) {
    useInjectionInstanceCollection(
      formItemInstsInjectionKey,
      'formItems',
      toRef(props, 'path')
    )
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const NForm = inject(formInjectionKey, null)
    const formItemSizeRefs = formItemSize(props)
    const formItemMiscRefs = formItemMisc(props)
    const {
      validationErrored: validationErroredRef,
      validationWarned: validationWarnedRef
    } = formItemMiscRefs
    const { mergedRequired: mergedRequiredRef, mergedRules: mergedRulesRef }
      = formItemRule(props)
    const { mergedSize: mergedSizeRef } = formItemSizeRefs
    const {
      mergedLabelPlacement: labelPlacementRef,
      mergedLabelAlign: labelTextAlignRef,
      mergedRequireMarkPlacement: mergedRequireMarkPlacementRef
    } = formItemMiscRefs
    const renderExplainsRef = ref<
      Array<{
        key: string
        render: () => VNodeChild
      }>
    >([])
    const feedbackIdRef = ref(createId())
    const mergedDisabledRef = NForm
      ? toRef(NForm.props, 'disabled')
      : ref(false)
    const themeRef = useTheme(
      'Form',
      '-form-item',
      style,
      formLight,
      props,
      mergedClsPrefixRef
    )
    watch(toRef(props, 'path'), () => {
      if (props.ignorePathChange)
        return
      restoreValidation()
    })
    function restoreValidation(): void {
      renderExplainsRef.value = []
      validationErroredRef.value = false
      validationWarnedRef.value = false
      if (props.feedback) {
        feedbackIdRef.value = createId()
      }
    }
    const internalValidate: FormItemInternalValidate = async (
      trigger: ValidationTrigger | string | null = null,
      shouldRuleBeApplied: ShouldRuleBeApplied = () => true,
      options: ValidateOption = {
        suppressWarning: true
      }
    ) => {
      const { path } = props
      if (!options) {
        options = {}
      }
      else {
        if (!options.first)
          options.first = props.first
      }
      const { value: rules } = mergedRulesRef
      const value = NForm ? get(NForm.props.model, path || '') : undefined
      const messageRenderers: Record<string, () => VNodeChild> = {}
      const originalMessageRendersMessage: Record<string, any> = {}
      const activeRules = (
        !trigger
          ? rules
          : rules.filter((rule) => {
            if (Array.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger)
            }
            else {
              return rule.trigger === trigger
            }
          })
      )
        .filter(shouldRuleBeApplied)
        .map((rule, i) => {
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
          if (shallowClonedRule.renderMessage) {
            const rendererKey = `__renderMessage__${i}`
            originalMessageRendersMessage[rendererKey]
              = shallowClonedRule.message
            shallowClonedRule.message = rendererKey
            messageRenderers[rendererKey] = shallowClonedRule.renderMessage
          }
          return shallowClonedRule
        })
      const activeErrorRules = activeRules.filter(r => r.level !== 'warning')
      const activeWarningRules = activeRules.filter(
        r => r.level === 'warning'
      )

      const validationResult: FormItemInternalValidateResult = {
        valid: true,
        errors: undefined,
        warnings: undefined
      }
      if (!activeRules.length)
        return validationResult

      const mergedPath = path ?? '__n_no_path__'
      const validator = new Schema({
        [mergedPath]: activeErrorRules as RuleItem[]
      })
      const warningValidator = new Schema({
        [mergedPath]: activeWarningRules as RuleItem[]
      })
      const { validateMessages } = NForm?.props || {}
      if (validateMessages) {
        validator.messages(validateMessages)
        warningValidator.messages(validateMessages)
      }

      const renderMessages = (errors: ValidateError[]): void => {
        renderExplainsRef.value = errors.map((error: ValidateError) => {
          const transformedMessage = error?.message || ''
          return {
            key: transformedMessage,
            render: () => {
              if (transformedMessage.startsWith('__renderMessage__')) {
                return messageRenderers[transformedMessage]()
              }
              return transformedMessage
            }
          }
        })
        errors.forEach((error) => {
          if (error.message?.startsWith('__renderMessage__')) {
            error.message = originalMessageRendersMessage[error.message]
          }
        })
      }

      if (activeErrorRules.length) {
        const errors = await new Promise<ValidateError[] | null>((resolve) => {
          void validator.validate({ [mergedPath]: value }, options, resolve)
        })
        if (errors?.length) {
          validationResult.valid = false
          validationResult.errors = errors
          renderMessages(errors)
        }
      }

      // if there are already errors, warning check can be skipped
      if (activeWarningRules.length && !validationResult.errors) {
        const warnings = await new Promise<ValidateError[] | null>(
          (resolve) => {
            void warningValidator.validate(
              { [mergedPath]: value },
              options,
              resolve
            )
          }
        )
        if (warnings?.length) {
          renderMessages(warnings)
          validationResult.warnings = warnings
        }
      }

      if (!validationResult.errors && !validationResult.warnings) {
        restoreValidation()
      }
      else {
        validationErroredRef.value = !!validationResult.errors
        validationWarnedRef.value = !!validationResult.warnings
      }

      return validationResult
    }
    function handleContentBlur(): void {
      void internalValidate('blur')
    }
    function handleContentChange(): void {
      void internalValidate('change')
    }
    function handleContentFocus(): void {
      void internalValidate('focus')
    }
    function handleContentInput(): void {
      void internalValidate('input')
    }
    // Resolve : ()
    // Reject  : (errors: AsyncValidator.ValidateError[])
    async function validate(options: FormItemValidateOptions): Promise<{
      warnings: ValidateError[] | undefined
    }>
    async function validate(
      trigger?: string | null,
      callback?: ValidateCallback
    ): Promise<{
      warnings: ValidateError[] | undefined
    }>
    async function validate(
      options?: string | null | FormItemValidateOptions,
      callback?: ValidateCallback
    ): Promise<{
        warnings: ValidateError[] | undefined
      }> {
      /** the following code is for compatibility */
      let trigger: ValidationTrigger | string | undefined
      let validateCallback: ValidateCallback | undefined
      let shouldRuleBeApplied: ShouldRuleBeApplied | undefined
      let asyncValidatorOptions: Record<string, any> | undefined
      if (typeof options === 'string') {
        trigger = options
        validateCallback = callback
      }
      else if (options !== null && typeof options === 'object') {
        trigger = options.trigger
        validateCallback = options.callback
        shouldRuleBeApplied = options.shouldRuleBeApplied
        asyncValidatorOptions = options.options
      }
      return await new Promise<{
        warnings: ValidateError[] | undefined
      }>((resolve, reject) => {
        void internalValidate(
          trigger,
          shouldRuleBeApplied,
          asyncValidatorOptions
        ).then(({ valid, errors, warnings }) => {
          if (valid) {
            if (validateCallback) {
              validateCallback(undefined, { warnings })
            }
            resolve({ warnings })
          }
          else {
            if (validateCallback) {
              validateCallback(errors, { warnings })
            }
            reject(errors)
          }
        })
      })
    }

    provide(formItemInjectionKey, {
      path: toRef(props, 'path'),
      disabled: mergedDisabledRef,
      mergedSize: formItemSizeRefs.mergedSize,
      mergedValidationStatus: formItemMiscRefs.mergedValidationStatus,
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
    const labelElementRef = ref<null | HTMLLabelElement>(null)
    onMounted((): void => {
      if (!formItemMiscRefs.isAutoLabelWidth.value)
        return
      const labelElement = labelElementRef.value
      if (labelElement !== null) {
        const memoizedWhitespace = labelElement.style.whiteSpace
        labelElement.style.whiteSpace = 'nowrap'
        labelElement.style.width = ''
        NForm?.deriveMaxChildLabelWidth(
          Number(getComputedStyle(labelElement).width.slice(0, -2))
        )
        labelElement.style.whiteSpace = memoizedWhitespace
      }
    })
    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const { value: labelPlacement } = labelPlacementRef
      const direction: 'vertical' | 'horizontal'
        = labelPlacement === 'top' ? 'vertical' : 'horizontal'
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
          labelFontWeight,
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

      let mergedLabelTextAlign = labelTextAlignRef.value ?? labelTextAlign
      if (labelPlacement === 'top') {
        mergedLabelTextAlign
          = mergedLabelTextAlign === 'right' ? 'flex-end' : 'flex-start'
      }

      const cssVars = {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-line-height': lineHeight,
        '--n-blank-height': blankHeight,
        '--n-label-font-size': labelFontSize,
        '--n-label-text-align': mergedLabelTextAlign,
        '--n-label-height': labelHeight,
        '--n-label-padding': labelPadding,
        '--n-label-font-weight': labelFontWeight,
        '--n-asterisk-color': asteriskColor,
        '--n-label-text-color': labelTextColor,
        '--n-feedback-padding': feedbackPadding,
        '--n-feedback-font-size': feedbackFontSize,
        '--n-feedback-height': feedbackHeight,
        '--n-feedback-text-color': feedbackTextColor,
        '--n-feedback-text-color-warning': feedbackTextColorWarning,
        '--n-feedback-text-color-error': feedbackTextColorError
      }
      return cssVars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'form-item',
        computed(() => {
          return `${mergedSizeRef.value[0]}${labelPlacementRef.value[0]}${
            labelTextAlignRef.value?.[0] || ''
          }`
        }),
        cssVarsRef,
        props
      )
      : undefined
    const reverseColSpaceRef = computed(() => {
      // label placement left
      // require-mark-placement | label align | areas (1fr auto)
      // left                   | left        | mark text (need reverse)
      // left                   | right       | mark text (okay)
      // right                  | left        | mark text (okay)
      // right                  | right       | mark text (okay)
      // right-hanging          | left        | text mark (okay)
      // right-hanging          | right       | text mark (okay)
      return (
        labelPlacementRef.value === 'left'
        && mergedRequireMarkPlacementRef.value === 'left'
        && labelTextAlignRef.value === 'left'
      )
    })
    return {
      labelElementRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRequired: mergedRequiredRef,
      feedbackId: feedbackIdRef,
      renderExplains: renderExplainsRef,
      reverseColSpace: reverseColSpaceRef,
      ...formItemMiscRefs,
      ...formItemSizeRefs,
      ...exposedRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const {
      $slots,
      mergedClsPrefix,
      mergedShowLabel,
      mergedShowRequireMark,
      mergedRequireMarkPlacement,
      onRender
    } = this
    const renderedShowRequireMark
      = mergedShowRequireMark !== undefined
        ? mergedShowRequireMark
        : this.mergedRequired
    onRender?.()

    const renderLabel = (): JSX.Element | null => {
      const labelText = this.$slots.label ? this.$slots.label() : this.label
      if (!labelText)
        return null
      const textNode = (
        <span class={`${mergedClsPrefix}-form-item-label__text`}>
          {labelText}
        </span>
      )
      const markNode = renderedShowRequireMark ? (
        <span class={`${mergedClsPrefix}-form-item-label__asterisk`}>
          {mergedRequireMarkPlacement !== 'left' ? '\u00A0*' : '*\u00A0'}
        </span>
      ) : (
        mergedRequireMarkPlacement === 'right-hanging' && (
          <span
            class={`${mergedClsPrefix}-form-item-label__asterisk-placeholder`}
          >
            {'\u00A0*'}
          </span>
        )
      )
      const { labelProps } = this
      return (
        <label
          {...labelProps}
          class={[
            labelProps?.class,
            `${mergedClsPrefix}-form-item-label`,
            `${mergedClsPrefix}-form-item-label--${mergedRequireMarkPlacement}-mark`,
            this.reverseColSpace
            && `${mergedClsPrefix}-form-item-label--reverse-columns-space`
          ]}
          style={this.mergedLabelStyle as any}
          ref="labelElementRef"
        >
          {mergedRequireMarkPlacement === 'left'
            ? [markNode, textNode]
            : [textNode, markNode]}
        </label>
      )
    }

    return (
      <div
        class={[
          `${mergedClsPrefix}-form-item`,
          this.themeClass,
          `${mergedClsPrefix}-form-item--${this.mergedSize}-size`,
          `${mergedClsPrefix}-form-item--${this.mergedLabelPlacement}-labelled`,
          this.isAutoLabelWidth
          && `${mergedClsPrefix}-form-item--auto-label-width`,
          !mergedShowLabel && `${mergedClsPrefix}-form-item--no-label`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {mergedShowLabel && renderLabel()}
        <div
          class={[
            `${mergedClsPrefix}-form-item-blank`,
            this.mergedValidationStatus
            && `${mergedClsPrefix}-form-item-blank--${this.mergedValidationStatus}`
          ]}
        >
          {$slots}
        </div>
        {this.mergedShowFeedback ? (
          <div
            key={this.feedbackId}
            style={this.feedbackStyle}
            class={[
              `${mergedClsPrefix}-form-item-feedback-wrapper`,
              this.feedbackClass
            ]}
          >
            <Transition name="fade-down-transition" mode="out-in">
              {{
                default: () => {
                  const { mergedValidationStatus } = this
                  return resolveWrappedSlot(
                    $slots.feedback as Slot | undefined,
                    (children) => {
                      const { feedback } = this
                      const feedbackNodes
                        = children || feedback ? (
                          <div
                            key="__feedback__"
                            class={`${mergedClsPrefix}-form-item-feedback__line`}
                          >
                            {children || feedback}
                          </div>
                        ) : this.renderExplains.length ? (
                          this.renderExplains?.map(({ key, render }) => (
                            <div
                              key={key}
                              class={`${mergedClsPrefix}-form-item-feedback__line`}
                            >
                              {render()}
                            </div>
                          ))
                        ) : null
                      return feedbackNodes ? (
                        mergedValidationStatus === 'warning' ? (
                          <div
                            key="controlled-warning"
                            class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--warning`}
                          >
                            {feedbackNodes}
                          </div>
                        ) : mergedValidationStatus === 'error' ? (
                          <div
                            key="controlled-error"
                            class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--error`}
                          >
                            {feedbackNodes}
                          </div>
                        ) : mergedValidationStatus === 'success' ? (
                          <div
                            key="controlled-success"
                            class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--success`}
                          >
                            {feedbackNodes}
                          </div>
                        ) : (
                          <div
                            key="controlled-default"
                            class={`${mergedClsPrefix}-form-item-feedback`}
                          >
                            {feedbackNodes}
                          </div>
                        )
                      ) : null
                    }
                  )
                }
              }}
            </Transition>
          </div>
        ) : null}
      </div>
    )
  }
})
