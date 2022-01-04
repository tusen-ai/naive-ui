import { ref, computed, toRef, Ref } from 'vue'
import { useMergedState } from 'vooks'
import type { Option, OptionValue, Filter, CheckedStatus } from './interface'

interface UseTransferDataProps {
  defaultValue: OptionValue[] | null
  value?: OptionValue[] | null
  options: Option[]
  filterable: boolean
  filter: Filter
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTransferData (
  props: UseTransferDataProps,
  mergedDisabledRef: Ref<boolean>
) {
  const uncontrolledValueRef = ref(props.defaultValue)
  const controlledValueRef = toRef(props, 'value')

  const mergedValueRef = useMergedState(
    controlledValueRef,
    uncontrolledValueRef
  )

  // map 化的 options
  const optMapRef = computed(() => {
    const map = new Map()
    ;(props.options || []).forEach((opt) => map.set(opt.value, opt))
    return map
  })

  // set 化的 value
  const tgtValueSetRef = computed(() => new Set(mergedValueRef.value || []))

  // 用于展示源项列表数目
  const srcOptsRef = computed(() => props.options)

  // 用于展示目标项列表数目
  const tgtOptsRef = computed(() => {
    const optMap = optMapRef.value
    return (mergedValueRef.value || []).map((v) => optMap.get(v))
  })

  // 源项过滤输入的值
  const srcPatternRef = ref('')

  // 被过滤后的源项列表
  const filteredSrcOptsRef = computed(() => {
    if (!props.filterable) return props.options
    const { filter } = props
    return props.options.filter((opt) =>
      filter(srcPatternRef.value, opt, 'source')
    )
  })

  // 没有被禁用的源项列表
  const avlSrcValueSetRef = computed(
    () =>
      new Set(
        filteredSrcOptsRef.value
          .filter((opt) => !opt.disabled)
          .map((opt) => opt.value)
      )
  )

  // 用于源项头部复选框状态
  const srcCheckedStatusRef = computed<CheckedStatus>(() => {
    const checkedLength = mergedValueRef.value?.length
    const avlValueCount = avlSrcValueSetRef.value.size
    if (avlValueCount === 0) {
      return {
        checked: false,
        indeterminate: false,
        disabled: true
      }
    } else if (checkedLength === 0) {
      return {
        checked: false,
        indeterminate: false
      }
    } else if (checkedLength === avlValueCount) {
      return {
        checked: true,
        indeterminate: false
      }
    } else {
      return {
        checked: false,
        indeterminate: true
      }
    }
  })
  const isInputingRef = ref(false)
  function handleInputFocus (): void {
    isInputingRef.value = true
  }
  function handleInputBlur (): void {
    isInputingRef.value = false
  }
  function handleSrcFilterUpdateValue (value: string | null): void {
    srcPatternRef.value = value ?? ''
  }
  return {
    uncontrolledValue: uncontrolledValueRef,
    mergedValue: mergedValueRef,
    tgtValueSet: tgtValueSetRef,
    avlSrcValueSet: avlSrcValueSetRef,
    tgtOpts: tgtOptsRef,
    srcOpts: srcOptsRef,
    filteredSrcOpts: filteredSrcOptsRef,
    srcCheckedStatus: srcCheckedStatusRef,
    srcPattern: srcPatternRef,
    isInputing: isInputingRef,
    handleInputFocus,
    handleInputBlur,
    handleSrcFilterUpdateValue
  }
}
