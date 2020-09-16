import {
  ref,
  computed,
  watch,
  onMounted, inject, toRef
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
  watch(controlledStateRef, value => {
    if (value !== undefined) {
      uncontrolledStateRef.value = value
    }
  })
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

export function useMemo (valueGenerator, deps) {
  const valueRef = ref(valueGenerator())
  watch(deps, () => {
    valueRef.value = valueGenerator()
  })
  return valueRef
}

export function useInjectionRef (injectionName, key, fallback) {
  const injection = inject(injectionName)
  if (!injection && arguments.length > 2) return fallback
  return toRef(injection, key)
}

export { default as useLastClickPosition } from './use-last-click-position'
