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
    const targetOptions: Option[] = []
    ;(mergedValueRef.value || []).forEach((v) => {
      const option = optionMap.get(v)
      if (option) {
        targetOptions.push(option)
      }
    })
    return targetOptions
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
    const values: Array<string | number> = []
    filteredSrcOptionsRef.value.forEach((option) => {
      if (!option.disabled || mergedValueSet.has(option.value)) {
        values.push(option.value)
      }
    })
    return new Set(values)
  })

  const valueSetForUnselectAllRef = computed(() => {
    const values: Array<string | number> = []
    targetOptionsRef.value.forEach((option) => {
      if (option.disabled) {
        values.push(option.value)
      }
    })
    return new Set(values)
  })

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
