import {
  ref,
  watch
} from 'vue'

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

export function useDelayedValue () {

}

export function useDelayedFalse () {

}
