import { ref } from 'vue'

const mousePositionRef = ref(null)

document.documentElement.addEventListener('click', (e) => {
  mousePositionRef.value = {
    x: e.clientX,
    y: e.clientY
  }
  window.setTimeout(() => {
    mousePositionRef.value = null
  }, 32)
}, true)

export default function useLastClickPosition () {
  return mousePositionRef
}
