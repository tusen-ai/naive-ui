import {
  h,
  defineComponent,
  PropType,
  provide,
  ExtractPropTypes,
  ref,
  toRef
} from 'vue'
import { ValidateError } from 'async-validator'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formLight } from '../styles'
import type { FormTheme } from '../styles'
import style from './styles/form.cssr'
import {
  ShouldRuleBeApplied,
  FormItemInst,
  FormRules,
  FormValidateCallback,
  LabelAlign,
  LabelPlacement,
  FormInst,
  formItemInstsInjectionKey,
  formInjectionKey,
  Size
} from './interface'
import { ExtractPublicPropTypes, keysOf } from '../../_utils'

const formProps = {
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
  showRequireMark: Boolean,
  requireMarkPlacement: String as PropType<'left' | 'right'>,
  showFeedback: {
    type: Boolean,
    default: true
  },
  onSubmit: {
    type: Function as PropType<(e: Event) => void>,
    default: (e: Event) => e.preventDefault()
  },
  showLabel: Boolean
} as const

export type FormSetupProps = ExtractPropTypes<typeof formProps>
export type FormProps = ExtractPublicPropTypes<typeof formProps>

export default defineComponent({
  name: 'Form',
  props: formProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    useTheme('Form', 'Form', style, formLight, props, mergedClsPrefixRef)
    // from path to form-item
    const formItems: Record<string, FormItemInst[]> = {}
    // label-width = 'auto'
    const maxChildLabelWidth = ref(0)
    const deriveMaxChildLabelWidth = (currentWidth: number): void => {
      if (currentWidth >= maxChildLabelWidth.value) {
        maxChildLabelWidth.value = currentWidth
      }
    }
    async function validate (
      validateCallback?: FormValidateCallback,
      shouldRuleBeApplied: ShouldRuleBeApplied = () => true
    ): Promise<void> {
      return await new Promise((resolve, reject) => {
        const formItemValidationPromises: Array<
        Promise<{
          valid: boolean
          errors?: ValidateError[]
        }>
        > = []
        for (const key of keysOf(formItems)) {
          const formItemInstances = formItems[key]
          for (const formItemInstance of formItemInstances) {
            if (formItemInstance.path) {
              formItemValidationPromises.push(
                formItemInstance.internalValidate(null, shouldRuleBeApplied)
              )
            }
          }
        }
        void Promise.all(formItemValidationPromises).then((results) => {
          if (results.some((result) => !result.valid)) {
            const errors = results
              .filter((result) => result.errors)
              .map((result) => result.errors)
            if (validateCallback) {
              validateCallback(errors as ValidateError[][])
            }
            reject(errors)
          } else {
            if (validateCallback) validateCallback()
            resolve()
          }
        })
      })
    }
    function restoreValidation (): void {
      for (const key of keysOf(formItems)) {
        const formItemInstances = formItems[key]
        for (const formItemInstance of formItemInstances) {
          formItemInstance.restoreValidation()
        }
      }
    }
    provide(formInjectionKey, {
      size: toRef(props, 'size'),
      labelWidth: toRef(props, 'labelWidth'),
      labelPlacement: toRef(props, 'labelPlacement'),
      labelAlign: toRef(props, 'labelAlign'),
      showRequireMark: toRef(props, 'showRequireMark'),
      requireMarkPlacement: toRef(props, 'requireMarkPlacement'),
      showFeedback: toRef(props, 'showFeedback'),
      showLabel: toRef(props, 'showLabel'),
      rules: toRef(props, 'rules'),
      disabled: toRef(props, 'disabled'),
      model: toRef(props, 'model'),
      maxChildLabelWidth,
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
  render () {
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
