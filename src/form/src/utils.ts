import { inject, computed, ref, ComputedRef } from 'vue'
import { get } from 'lodash-es'
import { pxfy } from 'seemly'
import { FormItemProps } from './FormItem'
import { Size, FormInjection, FormItemRule } from './interface'

export function formItemSize (
  props: FormItemProps
): {
    mergedSize: ComputedRef<Size>
  } {
  const NForm = inject<FormInjection | null>('NForm', null)
  return {
    mergedSize: computed(() => {
      if (props.size !== undefined) return props.size
      if (NForm?.size !== undefined) return NForm.size
      return 'medium'
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function formItemMisc (props: FormItemProps) {
  const NForm = inject<FormInjection | null>('NForm', null)
  const mergedLabelWidthRef = computed(() => {
    if (mergedLabelPlacementRef.value === 'top') return
    const { labelWidth } = props
    if (labelWidth !== undefined) return pxfy(labelWidth)
    if (NForm?.labelWidth !== undefined) return pxfy(NForm.labelWidth)
    return undefined
  })
  const mergedLabelStyleRef = computed(() => {
    return [
      props.labelStyle,
      {
        width: mergedLabelWidthRef.value
      }
    ]
  })
  const mergedLabelPlacementRef = computed(() => {
    const { labelPlacement } = props
    if (labelPlacement !== undefined) return labelPlacement
    if (NForm?.labelPlacement) return NForm.labelPlacement
    return 'top'
  })
  const mergedLabelAlignRef = computed(() => {
    const { labelAlign } = props
    if (labelAlign) return labelAlign
    if (NForm?.labelAlign) return NForm.labelAlign
    return 'left'
  })
  const mergedShowRequireMarkRef = computed(() => {
    const { showRequireMark } = props
    if (showRequireMark !== undefined) return showRequireMark
    if (NForm?.showRequireMark !== undefined) {
      return NForm.showRequireMark
    }
    return undefined
  })
  const validationErroredRef = ref(false)
  const mergedValidationStatusRef = computed(() => {
    const { validationStatus } = props
    if (validationStatus !== undefined) return validationStatus
    if (validationErroredRef.value) return 'error'
    return undefined
  })
  const mergedShowFeedbackRef = computed(() => {
    const { showFeedback } = props
    if (showFeedback) return showFeedback
    if (NForm?.showFeedback) return NForm.showFeedback
    return true
  })
  return {
    validationErrored: validationErroredRef,
    mergedLabelStyle: mergedLabelStyleRef,
    mergedLabelPlacement: mergedLabelPlacementRef,
    mergedLabelAlign: mergedLabelAlignRef,
    mergedShowRequireMark: mergedShowRequireMarkRef,
    mergedValidationStatus: mergedValidationStatusRef,
    mergedShowFeedback: mergedShowFeedbackRef
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function formItemRule (props: FormItemProps) {
  const NForm = inject<FormInjection | null>('NForm', null)
  const compatibleRulePathRef = computed(() => {
    const { rulePath } = props
    if (rulePath !== undefined) return rulePath
    const { path } = props
    if (path !== undefined) return path
    return undefined
  })
  const mergedRulesRef = computed(() => {
    const rules = []
    const { rule } = props
    if (rule !== undefined) {
      if (Array.isArray(rule)) rules.push(...rule)
      else rules.push(rule)
    }
    if (NForm) {
      const { rules: formRules } = NForm
      const { value: rulePath } = compatibleRulePathRef
      if (formRules !== undefined && rulePath !== undefined) {
        const formRule = get(formRules, rulePath)
        if (formRule !== undefined) {
          if (Array.isArray(formRule)) {
            rules.push(...formRule)
          } else {
            // terminate object must be a form item rule
            rules.push(formRule as FormItemRule)
          }
        }
      }
    }
    return rules
  })
  const hasRequiredRuleRef = computed(() => {
    return mergedRulesRef.value.some((rule) => rule.required)
  })
  // deprecated
  const mergedRequiredRef = computed(() => {
    return hasRequiredRuleRef.value || props.required
  })
  return {
    mergedRules: mergedRulesRef,
    mergedRequired: mergedRequiredRef
  }
}
