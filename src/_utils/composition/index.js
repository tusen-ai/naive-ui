import {
  ref,
  computed,
  watch,
  onMounted
} from 'vue'

export function useFalseUntilTruthy (valueRef) {
  const bindValueRef = ref(!!valueRef.value)
  watch(valueRef, value => {
    if (value) {
      bindValueRef.value = true
    }
  })
  return bindValueRef
}

export function useMergedState (
  controlledStateRef,
  uncontrolledStateRef
) {
  return computed(() => {
    if (controlledStateRef.value === undefined) {
      return uncontrolledStateRef.value
    }
    return controlledStateRef.value
  })
}

export function useCompitable (reactive, keys) {
  return computed(() => {
    for (const key of keys) {
      if (reactive[key] !== undefined) return reactive[key]
    }
  })
}

export function useIsMounted () {
  const isMounted = ref(false)
  onMounted(() => {
    isMounted.value = true
  })
  return isMounted
}

export { default as useLastClickPosition } from './use-last-click-position'
export { default as useContainer } from './use-container'
