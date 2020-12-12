import { inject, computed, ref } from 'vue'
import { get } from 'lodash-es'
import { pxfy } from 'seemly'

export function formItemSize (props) {
  const NForm = inject('NForm')
  return {
    mergedSize: computed(() => {
      if (props.size !== undefined) return props.size
      if (NForm && NForm.size !== undefined) return NForm.size
      return 'medium'
    })
  }
}

export function formItemMisc (props) {
  const NForm = inject('NForm')
  const mergedLabelWidthRef = computed(() => {
    if (mergedLabelPlacementRef.value === 'top') return
    const { labelWidth } = props
    if (labelWidth !== undefined) return pxfy(labelWidth)
    if (NForm && NForm.labelWidth !== undefined) return pxfy(NForm.labelWidth)
    return undefined
  })
  const mergedLabelStyleRef = computed(() => {
    return {
      width: mergedLabelWidthRef.value,
      ...props.labelStyle
    }
  })
  const mergedLabelPlacementRef = computed(() => {
    const { labelPlacement } = props
    if (labelPlacement !== undefined) return labelPlacement
    if (NForm && NForm.labelPlacement) return NForm.labelPlacement
    return 'top'
  })
  const mergedLabelAlignRef = computed(() => {
    const { labelAlign } = props
    if (labelAlign) return labelAlign
    if (NForm && NForm.labelAlign) return NForm.labelAlign
    return 'left'
  })
  const mergedShowRequireMarkRef = computed(() => {
    const { showRequireMark } = props
    if (showRequireMark !== undefined) return showRequireMark
    if (NForm && NForm.showRequireMark !== undefined) {
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
    if (NForm && NForm.showFeedback) return NForm.showFeedback
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

export function formItemRule (props) {
  const NForm = inject('NForm')
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
    const { rules: formRules } = NForm
    if (formRules !== undefined) {
      const formRule = get(formRules, compatibleRulePathRef.value)
      if (formRule !== undefined) {
        if (Array.isArray(formRule)) {
          rules.push(...formRule)
        } else {
          rules.push(formRule)
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
