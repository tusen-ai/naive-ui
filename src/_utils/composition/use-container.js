import { computed } from 'vue'

export default function useContainer (
  toRef,
  containerClassNameRef
) {
  const getContainerTarget = computed(
    () => typeof toRef.value === 'string' ? () => document.querySelector(toRef.value) : () => toRef.value
  )
  const getContainer = computed(
    () => () => getContainerTarget.value().querySelector('.' + containerClassNameRef.value)
  )
  const mountIfNotExist = () => {
    const targetEl = getContainerTarget.value()
    if (!targetEl.querySelector('.' + containerClassNameRef.value)) {
      const containerEl = document.createElement('div')
      containerEl.className = containerClassNameRef.value
      targetEl.appendChild(containerEl)
    }
  }
  const unmountIfEmpty = () => {
    const container = getContainer.value()
    if (!container.childElementCount) {
      container.parentNode.removeChild(container)
    }
  }
  return [
    mountIfNotExist,
    unmountIfEmpty
  ]
}
