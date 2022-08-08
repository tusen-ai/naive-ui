import { ref, computed, toRef } from 'vue'
import { useMergedState } from 'vooks'
import type { Option, OptionValue, Filter } from './interface'

interface UseTransferDataProps {
  defaultValue: OptionValue[] | null
  value?: OptionValue[] | null
  options: Option[]
  filterable: boolean
  filter: Filter
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTransferData (props: UseTransferDataProps) {
  const uncontrolledValueRef = ref(props.defaultValue)
  const mergedValueRef = useMergedState(
    toRef(props, 'value'),
    uncontrolledValueRef
  )

  const optionsMapRef = computed(() => {
    const map = new Map()
    ;(props.options || []).forEach((opt) => map.set(opt.value, opt))
    return map as Map<OptionValue, Option>
  })

  const targetValueSetRef = computed(() => new Set(mergedValueRef.value || []))

  const targetOptionsRef = computed(() => {
    const optionMap = optionsMapRef.value
    return (mergedValueRef.value || [])
      .map((v) => optionMap.get(v))
      .filter((item) => item !== undefined) as Option[]
  })

  const srcPatternRef = ref('')

  const filteredSrcOptionsRef = computed(() => {
    if (!props.filterable) return props.options
    const { filter } = props
    return props.options.filter((opt) => filter(srcPatternRef.value, opt))
  })

  const mergedValueSetRef = computed<Set<string | number>>(() => {
    const { value } = mergedValueRef
    if (value === null) return new Set()
    return new Set(value)
  })

  const valueSetForSelectAllRef = computed(() => {
    const mergedValueSet = mergedValueSetRef.value
    return new Set(
      filteredSrcOptionsRef.value
        .filter(
          (option) => !option.disabled || mergedValueSet.has(option.value)
        )
        .map((option) => option.value)
    )
  })

  const valueSetForUnselectAllRef = computed(
    () =>
      new Set(
        targetOptionsRef.value
          .filter((option) => option.disabled)
          .map((option) => option.value)
      )
  )

  const canNotSelectAnythingRef = computed(() => {
    return filteredSrcOptionsRef.value.every((option) => option.disabled)
  })

  const allCheckedRef = computed(() => {
    if (!filteredSrcOptionsRef.value.length) {
      return false
    }
    const mergedValueSet = mergedValueSetRef.value
    return filteredSrcOptionsRef.value.every(
      (option) => option.disabled || mergedValueSet.has(option.value)
    )
  })

  const canBeClearedRef = computed(() => {
    return targetOptionsRef.value.some((option) => !option.disabled)
  })

  function handleSrcFilterUpdateValue (value: string | null): void {
    srcPatternRef.value = value ?? ''
  }
  return {
    uncontrolledValueRef,
    mergedValueRef,
    targetValueSetRef,
    valueSetForSelectAllRef,
    valueSetForUnselectAllRef,
    targetOptionsRef,
    filteredSrcOptionsRef,
    canNotSelectAnythingRef,
    canBeClearedRef,
    allCheckedRef,
    srcPatternRef,
    handleSrcFilterUpdateValue
  }
}
