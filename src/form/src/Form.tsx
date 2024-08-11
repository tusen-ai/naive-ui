import {
  type ComponentPublicInstance,
  type ExtractPropTypes,
  type PropType,
  defineComponent,
  h,
  provide,
  ref
} from 'vue'
import type { ValidateError } from 'async-validator'
import type { StandardBehaviorOptions } from 'scroll-into-view-if-needed'
import scrollIntoView from 'scroll-into-view-if-needed'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formLight } from '../styles'
import type { FormTheme } from '../styles'
import { type ExtractPublicPropTypes, keysOf } from '../../_utils'
import style from './styles/form.cssr'
import type {
  FormInst,
  FormItemInst,
  FormItemInternalValidateResult,
  FormRules,
  FormValidateCallback,
  FormValidateMessages,
  LabelAlign,
  LabelPlacement,
  ShouldRuleBeApplied,
  Size
} from './interface'
import { formInjectionKey, formItemInstsInjectionKey } from './context'

export const formProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  inline: Boolean,
  labelWidth: [Number, String] as PropType<number | string>,
  labelAlign: String as PropType<LabelAlign>,
  labelPlacement: {
    type: String as PropType<LabelPlacement>,
    default: 'top'
  },
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => {}
  },
  rules: Object as PropType<FormRules>,
  disabled: Boolean,
  size: String as PropType<Size>,
  showRequireMark: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  requireMarkPlacement: String as PropType<'left' | 'right' | 'right-hanging'>,
  showFeedback: {
    type: Boolean,
    default: true
  },
  onSubmit: {
    type: Function as PropType<(e: Event) => void>,
    default: (e: Event) => {
      e.preventDefault()
    }
  },
  showLabel: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  validateMessages: Object as PropType<Partial<FormValidateMessages>>,
  scrollToFirstError: {
    type: [Boolean, Object] as PropType<boolean | StandardBehaviorOptions>,
    default: undefined
  }
} as const

export type FormSetupProps = ExtractPropTypes<typeof formProps>
export type FormProps = ExtractPublicPropTypes<typeof formProps>

export default defineComponent({
  name: 'Form',
  props: formProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props)
    useTheme('Form', '-form', style, formLight, props, mergedClsPrefixRef)
    // from path to form-item
    const formItems: Record<string, FormItemInst[]> = {}
    // for label-width = 'auto'
    const maxChildLabelWidthRef = ref<number | undefined>(undefined)
    const deriveMaxChildLabelWidth = (currentWidth: number): void => {
      const currentMaxChildLabelWidth = maxChildLabelWidthRef.value
      if (
        currentMaxChildLabelWidth === undefined
        || currentWidth >= currentMaxChildLabelWidth
      ) {
        maxChildLabelWidthRef.value = currentWidth
      }
    }
    async function validate(
      validateCallback?: FormValidateCallback,
      shouldRuleBeApplied: ShouldRuleBeApplied = () => true
    ): Promise<{ warnings: ValidateError[][] | undefined }> {
      return await new Promise<{ warnings: ValidateError[][] | undefined }>(
        (resolve, reject) => {
          const formItemValidationPromises: Array<
            Promise<
              FormItemInternalValidateResult & {
                formItemInstance: FormItemInst
              }
            >
          > = []
          for (const key of keysOf(formItems)) {
            const formItemInstances = formItems[key]
            for (const formItemInstance of formItemInstances) {
              if (formItemInstance.path) {
                formItemValidationPromises.push(
                  formItemInstance
                    .internalValidate(null, shouldRuleBeApplied)
                    .then((results) => {
                      return {
                        ...results,
                        formItemInstance
                      }
                    })
                )
              }
            }
          }
          void Promise.all(formItemValidationPromises).then((results) => {
            const formItemInsts: FormItemInst[] = []
            const formInvalid = results.some(result => !result.valid)

            const errors: ValidateError[][] = []
            const warnings: ValidateError[][] = []
            results.forEach((result) => {
              if (result.errors?.length) {
                errors.push(result.errors)
                formItemInsts.push(result.formItemInstance)
              }
              if (result.warnings?.length) {
                warnings.push(result.warnings)
              }
            })
            if (validateCallback) {
              validateCallback(errors.length ? errors : undefined, {
                warnings: warnings.length ? warnings : undefined
              })
            }
            if (formInvalid) {
              reject(errors.length ? errors : undefined)
              const { scrollToFirstError } = props

              if (scrollToFirstError && formItemInsts.length > 0) {
                const sortedFormItemEls = formItemInsts
                  .map(
                    inst =>
                      (inst as ComponentPublicInstance<FormItemInst>)
                        .$el as HTMLElement
                  )
                  .sort((a, b) => {
                    const position = a.compareDocumentPosition(b)
                    return position & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1
                  })

                const firstNode = sortedFormItemEls[0]
                let scrollViewOptions: StandardBehaviorOptions = {}
                if (typeof scrollToFirstError === 'object') {
                  scrollViewOptions = scrollToFirstError
                }
                scrollIntoView(firstNode, {
                  scrollMode: 'if-needed',
                  block: 'nearest',
                  ...scrollViewOptions
                })
              }
            }
            else {
              resolve({
                warnings: warnings.length ? warnings : undefined
              })
            }
          })
        }
      )
    }
    function restoreValidation(): void {
      for (const key of keysOf(formItems)) {
        const formItemInstances = formItems[key]
        for (const formItemInstance of formItemInstances) {
          formItemInstance.restoreValidation()
        }
      }
    }
    provide(formInjectionKey, {
      props,
      maxChildLabelWidthRef,
      deriveMaxChildLabelWidth
    })
    provide(formItemInstsInjectionKey, { formItems })
    const formExposedMethod: FormInst = {
      validate,
      restoreValidation
    }
    return Object.assign(formExposedMethod, {
      mergedClsPrefix: mergedClsPrefixRef
    })
  },
  render() {
    const { mergedClsPrefix } = this
    return (
      <form
        class={[
          `${mergedClsPrefix}-form`,
          this.inline && `${mergedClsPrefix}-form--inline`
        ]}
        onSubmit={this.onSubmit}
      >
        {this.$slots}
      </form>
    )
  }
})
