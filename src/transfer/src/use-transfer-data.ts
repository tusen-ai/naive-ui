import { ref, computed, toRef } from 'vue'
import { useMergedState } from 'vooks'
import type { Option, OptionValue, Filter } from './interface'

interface UseTransferDataProps {
  defaultValue: OptionValue[] | null
  value?: OptionValue[] | null
  options: Option[]
  filterable: boolean | undefined
  sourceFilterable: Boolean
  targetFilterable: Boolean
  showSelected: Boolean
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
    return props.sourceFilterable || !!props.filterable
  })

  const filteredSrcOptionsRef = computed(() => {
    const { showSelected, options, filter } = props
    if (!mergedSrcFilterableRef.value) {
      if (showSelected) {
        return options
      } else {
        return options.filter(
          (option) => !targetValueSetRef.value.has(option.value)
        )
      }
    }
    return options.filter((option) => {
      return (
        filter(srcPatternRef.value, option, 'source') &&
        (showSelected || !targetValueSetRef.value.has(option.value))
      )
    })
  })

  const filteredTgtOptionsRef = computed(() => {
    if (!props.targetFilterable) return targetOptionsRef.value
    const { filter } = props
    return targetOptionsRef.value.filter((opt) =>
      filter(tgtPatternRef.value, opt, 'target')
    )
  })

  const mergedValueSetRef = computed<Set<string | number>>(() => {
    const { value } = mergedValueRef
    if (value === null) return new Set()
    return new Set(value)
  })

  const valueSetForCheckAllRef = computed(() => {
    const values: Set<string | number> = new Set(mergedValueSetRef.value)
    filteredSrcOptionsRef.value.forEach((option) => {
      if (!option.disabled && !values.has(option.value)) {
        values.add(option.value)
      }
    })
    return values
  })

  const valueSetForUncheckAllRef = computed(() => {
    const values: Set<string | number> = new Set(mergedValueSetRef.value)
    filteredSrcOptionsRef.value.forEach((option) => {
      if (!option.disabled && values.has(option.value)) {
        values.delete(option.value)
      }
    })
    return values
  })

  const valueSetForClearRef = computed(() => {
    const values: Set<string | number> = new Set(mergedValueSetRef.value)
    filteredTgtOptionsRef.value.forEach((option) => {
      if (!option.disabled) {
        values.delete(option.value)
      }
    })
    return values
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
    valueSetForCheckAllRef,
    valueSetForUncheckAllRef,
    valueSetForClearRef,
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
