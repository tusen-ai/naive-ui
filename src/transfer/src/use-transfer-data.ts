import { ref, computed, toRef } from 'vue'
import { useMergedState } from 'vooks'
import type { Option, OptionValue, Filter } from './interface'

interface UseTransferDataProps {
  defaultValue: OptionValue[] | null
  value?: OptionValue[] | null
  options: Option[]
  filterable: boolean
  sourceFilterable: Boolean
  targetFilterable: Boolean
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
  const tgtPatternRef = ref('')

  const mergedSrcFilterableRef = computed(() => {
    const { filterable, sourceFilterable } = props
    return sourceFilterable || filterable
  })

  const filteredSrcOptionsRef = computed(() => {
    if (!mergedSrcFilterableRef.value) return props.options
    const { filter } = props
    return props.options.filter((opt) =>
      filter(srcPatternRef.value, opt, 'source')
    )
  })

  const filteredTgtOptionsRef = computed(() => {
    if (!props.targetFilterable) return targetOptionsRef.value
    const { filter } = props
    return targetOptionsRef.value.filter((opt) =>
      filter(tgtPatternRef.value, opt, 'target')
    )
  })

  const mergedValueSetRef = computed<Set<string | number>>(() => {
    const { value } = targetOptionsRef
    if (value === null) return new Set()
    return new Set(value.map((i) => i.value))
  })

  const valueForSelectAllRef = computed(() => {
    const mergedValueSet = mergedValueSetRef.value
    const values: Array<string | number> = []
    filteredSrcOptionsRef.value.forEach((option) => {
      if (!option.disabled && !mergedValueSet.has(option.value)) {
        values.push(option.value)
      }
    })
    return new Set(values)
  })

  const valueSetForUnselectAllRef = computed(() => {
    const values: Array<string | number> = []
    filteredSrcOptionsRef.value.forEach((option) => {
      if (!option.disabled) {
        values.push(option.value)
      }
    })
    return new Set(values)
  })

  const valueForClearRef = computed(() => {
    const filterTgtOptsSet = new Set(
      filteredTgtOptionsRef.value.filter((option) => !option.disabled)
    )
    return targetOptionsRef.value
      .filter((i) => !filterTgtOptsSet.has(i))
      .map((option) => option.value)
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
    return filteredTgtOptionsRef.value.some((option) => !option.disabled)
  })

  function handleSrcFilterUpdateValue (value: string | null): void {
    srcPatternRef.value = value ?? ''
  }

  function handleTgtFilterUpdateValue (value: string | null): void {
    tgtPatternRef.value = value ?? ''
  }

  return {
    uncontrolledValueRef,
    mergedValueRef,
    targetValueSetRef,
    valueForSelectAllRef,
    valueSetForUnselectAllRef,
    valueForClearRef,
    filteredTgtOptionsRef,
    filteredSrcOptionsRef,
    targetOptionsRef,
    canNotSelectAnythingRef,
    canBeClearedRef,
    allCheckedRef,
    srcPatternRef,
    tgtPatternRef,
    mergedSrcFilterableRef,
    handleSrcFilterUpdateValue,
    handleTgtFilterUpdateValue
  }
}
