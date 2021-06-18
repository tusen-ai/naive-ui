import { h, defineComponent, PropType, provide, ExtractPropTypes } from 'vue'
import { ErrorList } from 'async-validator'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formLight } from '../styles'
import type { FormTheme } from '../styles'
import style from './styles/form.cssr'
import {
  ApplyRule,
  FormItemInst,
  FormRules,
  FormValidateCallback,
  LabelAlign,
  LabelPlacement,
  FormInst,
  formItemInstsInjectionKey,
  formInjectionKey
} from './interface'
import { ExtractPublicPropTypes, keysOf } from '../../_utils'

const formProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  inline: {
    type: Boolean,
    default: false
  },
  labelWidth: [Number, String] as PropType<number | string>,
  labelAlign: {
    type: String as PropType<LabelAlign>,
    default: 'left'
  },
  labelPlacement: {
    type: String as PropType<LabelPlacement>,
    default: 'top'
  },
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => {}
  },
  rules: Object as PropType<FormRules>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  showRequireMark: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  showFeedback: {
    type: Boolean,
    default: true
  },
  onSubmit: {
    type: Function as PropType<(e: Event) => void>,
    default: (e: Event) => e.preventDefault()
  }
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
    async function validate (
      validateCallback?: FormValidateCallback,
      shouldRuleBeApplied: ApplyRule = () => true
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        const formItemValidationPromises = []
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
              validateCallback(errors as ErrorList[])
            } else {
              reject(errors)
            }
          } else {
            if (validateCallback) validateCallback()
            else {
              resolve()
            }
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
    provide(formInjectionKey, props)
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
