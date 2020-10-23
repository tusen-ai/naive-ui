import {
  ref,
  computed,
  watch,
  onMounted,
  inject,
  toRef,
  getCurrentInstance,
  onBeforeUnmount,
  nextTick
} from 'vue'

export function useFalseUntilTruthy (valueRef) {
  const bindValueRef = ref(!!valueRef.value)
  const stop = watch(valueRef, value => {
    if (value) {
      bindValueRef.value = true
      stop()
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

export function useNotMounted () {
  const notMounted = ref(true)
  onMounted(() => {
    notMounted.value = false
  })
  return notMounted
}

export function useDisabledUntilMounted (durationTickCount = 0) {
  const disabled = ref(true)
  onMounted(() => {
    function countDown () {
      if (!durationTickCount) {
        disabled.value = false
      } else {
        durationTickCount -= 1
        nextTick(countDown)
      }
    }
    countDown()
  })
  return disabled
}

export function useMemo (valueGenerator) {
  const computedValueRef = computed(valueGenerator)
  const valueRef = ref(computedValueRef.value)
  watch(computedValueRef, value => {
    valueRef.value = value
  })
  return valueRef
}

export function useInjectionRef (injectionName, key, fallback) {
  const injection = inject(injectionName)
  if (!injection && arguments.length > 2) return fallback
  return toRef(injection, key)
}

export function onFontReady (callback) {
  onMounted(() => {
    const fontsReady = document.fonts.ready
    const currentInstance = getCurrentInstance().proxy
    fontsReady.then(() => {
      callback(currentInstance)
    })
  })
}

export function useInjectionCollection (injectionName, collectionKey, valueRef) {
  const injection = inject(injectionName, null)
  if (injection === null) return
  if (!(collectionKey in injection)) {
    injection[collectionKey] = []
  }
  injection[collectionKey].push(valueRef.value)
  watch(valueRef, (value, prevValue) => {
    const collectionArray = injection[collectionKey]
    const index = collectionArray.findIndex(
      collectionValue => collectionValue === prevValue
    )
    if (~index) collectionArray.splice(index, 1)
    collectionArray.push(value)
  })
  onBeforeUnmount(() => {
    const collectionArray = injection[collectionKey]
    const index = collectionArray.findIndex(
      collectionValue => collectionValue === valueRef.value
    )
    if (~index) collectionArray.splice(index, 1)
  })
}

export function useInjectionElementCollection (injectionName, collectionKey, getElement) {
  const injection = inject(injectionName)
  if (!(collectionKey in injection)) {
    injection[collectionKey] = []
  }
  onMounted(() => {
    const currentInstance = getCurrentInstance().proxy
    injection[collectionKey].push(
      getElement(currentInstance)
    )
  })
  onBeforeUnmount(() => {
    const collectionArray = injection[collectionKey]
    const currentInstance = getCurrentInstance().proxy
    const element = getElement(currentInstance)
    const index = collectionArray.findIndex(
      collectionElement => collectionElement === element
    )
    if (~index) collectionArray.splice(index, 1)
  })
}

export { default as useLastClickPosition } from './use-last-click-position'
export { useDelayedTrue } from './use-delayed'
