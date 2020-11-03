import {
  ref,
  watch,
  onMounted,
  inject,
  toRef,
  getCurrentInstance,
  onBeforeUnmount
} from 'vue'

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

export function useDelayedTrue (valueRef, delay, shouldDelayRef) {
  if (!delay) return valueRef
  const delayedRef = ref(valueRef.value)
  let timerId = null
  watch(valueRef, value => {
    if (timerId !== null) clearTimeout(timerId)
    if (value === true) {
      if (shouldDelayRef && shouldDelayRef.value === false) {
        delayedRef.value = true
      } else {
        timerId = setTimeout(() => {
          delayedRef.value = true
        }, delay)
      }
    } else {
      delayedRef.value = false
    }
  })
  return delayedRef
}
