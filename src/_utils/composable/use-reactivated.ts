import { onActivated, onDeactivated } from 'vue'

export function useReactivated (callback: () => void): {
  isDeactivated: boolean
} {
  const isDeactivatedRef = { isDeactivated: false }
  let activateStateInitialized = false
  onActivated(() => {
    isDeactivatedRef.isDeactivated = false
    if (!activateStateInitialized) {
      activateStateInitialized = true
      return
    }
    callback()
  })
  onDeactivated(() => {
    isDeactivatedRef.isDeactivated = true
    if (!activateStateInitialized) {
      activateStateInitialized = true
    }
  })
  return isDeactivatedRef
}
