import { inject, computed, ref, ComputedRef } from 'vue'
import { get } from 'lodash-es'
import type { FormItemSetupProps } from './FormItem'
import { formInjectionKey } from './interface'
import type { Size, FormItemRule } from './interface'
import { formatLength } from '../../_utils'

export function formItemSize (props: FormItemSetupProps): {
  mergedSize: ComputedRef<Size>
} {
  const NForm = inject(formInjectionKey, null)
  return {
    mergedSize: computed(() => {
      if (props.size !== undefined) return props.size
      if (NForm?.size.value !== undefined) return NForm.size.value
      return 'medium'
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function formItemMisc (props: FormItemSetupProps) {
  const NForm = inject(formInjectionKey, null)
  const mergedLabelWidthRef = computed(() => {
    if (mergedLabelPlacementRef.value === 'top') return
    const { labelWidth } = props
    const autoComputedWidth = NForm?.maxChildLabelWidth.value

    if (labelWidth === 'auto') {
      if (autoComputedWidth !== undefined) {
        return formatLength(autoComputedWidth)
      } else {
        return undefined
      }
    }

    if (labelWidth !== undefined) {
      return formatLength(labelWidth)
    }

    if (NForm?.labelWidth.value === 'auto') {
      if (autoComputedWidth !== undefined) {
        return formatLength(autoComputedWidth)
      } else {
        return undefined
      }
    }

    if (NForm?.labelWidth.value !== undefined) {
      return formatLength(NForm.labelWidth.value)
    }
    return undefined
  })
  const mergedLabelPlacementRef = computed(() => {
    const { labelPlacement } = props
    if (labelPlacement !== undefined) return labelPlacement
    if (NForm?.labelPlacement.value) return NForm.labelPlacement.value
    return 'top'
  })
  const mergedLabelAlignRef = computed(() => {
    const { labelAlign } = props
    if (labelAlign) return labelAlign
    if (NForm?.labelAlign.value) return NForm.labelAlign.value
    return undefined
  })
  const mergedLabelStyleRef = computed(() => {
    return [
      {
        width: mergedLabelWidthRef.value
      },
      props.labelStyle
    ]
  })
  const mergedShowRequireMarkRef = computed(() => {
    const { showRequireMark } = props
    if (showRequireMark !== undefined) return showRequireMark
    return NForm?.showRequireMark.value
  })
  const mergedRequireMarkPlacementRef = computed(() => {
    const { requireMarkPlacement } = props
    if (requireMarkPlacement !== undefined) return requireMarkPlacement
    return NForm?.requireMarkPlacement.value
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
    if (showFeedback !== undefined) return showFeedback
    if (NForm?.showFeedback.value !== undefined) return NForm.showFeedback.value
    return true
  })
  const mergedShowLabelRef = computed(() => {
    const { showLabel } = props
    if (showLabel !== undefined) return showLabel
    if (NForm?.showLabel.value !== undefined) return NForm.showLabel.value
    return true
  })
  return {
    validationErrored: validationErroredRef,
    mergedLabelStyle: mergedLabelStyleRef,
    mergedLabelPlacement: mergedLabelPlacementRef,
    mergedLabelAlign: mergedLabelAlignRef,
    mergedShowRequireMark: mergedShowRequireMarkRef,
    mergedRequireMarkPlacement: mergedRequireMarkPlacementRef,
    mergedValidationStatus: mergedValidationStatusRef,
    mergedShowFeedback: mergedShowFeedbackRef,
    mergedShowLabel: mergedShowLabelRef
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function formItemRule (props: FormItemSetupProps) {
  const NForm = inject(formInjectionKey, null)
  const compatibleRulePathRef = computed(() => {
    const { rulePath } = props
    if (rulePath !== undefined) return rulePath
    const { path } = props
    if (path !== undefined) return path
    return undefined
  })
  const mergedRulesRef = computed(() => {
    const rules: FormItemRule[] = []
    const { rule } = props
    if (rule !== undefined) {
      if (Array.isArray(rule)) rules.push(...rule)
      else rules.push(rule)
    }
    if (NForm) {
      const { rules: formRules } = NForm
      const { value: rulePath } = compatibleRulePathRef
      if (formRules.value !== undefined && rulePath !== undefined) {
        const formRule = get(formRules.value, rulePath)
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
